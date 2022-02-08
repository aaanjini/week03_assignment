import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { 
    createUserWithEmailAndPassword , 
    updateProfile , 
    signInWithEmailAndPassword ,
    setPersistence, 
    browserSessionPersistence
} from "firebase/auth"; //사용자 인증

import { auth } from '../../shared/firebase.js';
import firebase from "firebase/compat/app";
import { setCookie, deleteCookie } from "../../shared/Cookie";

//acrion
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creators
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user)=>({user}));
const setUser = createAction(SET_USER, (user)=>({user}));

const initialState = { //초기값
    user:null,
    is_login:false,
};
const user_initial = {
    user_name: "jini",
};



const loginFB = (id,pwd) => {
    return function(dispatch, getState, {history}){
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
            signInWithEmailAndPassword(auth, id, pwd)
            .then((user) => {
                dispatch(setUser({
                    user_name:user.user.displayName,
                    id:id, 
                    user_profile:'',
                    uid: user.user.uid,
                }));
                history.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
                window.alert('로그인에 실패했습니다.');
            });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });        
    };
}


const signupFB = (id, pwd , user_name) => { //아이디와 비밀번호,닉네임 받아오기
    return function (dispatch, getState, {history}){
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((user) => {
            // Signed in
            console.log(user);

            auth.currentUser.updateProfile({
                displayName: user_name,
            }).then(()=>{
                dispatch(setUser({user_name:user_name, id:id, user_profile:'', }));
                history.push("/");
            }).catch((error)=>{
                console.log(error);
            });
            //const _user = user.user;
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage);
            // ..
        });
    };
};

const loginCheckFB = () => {
    return function (dispatch, getState, {history}){
        auth.onAuthStateChanged((user)=> {
            if(user){
                dispatch(setUser({
                    user_name: user.displayName,
                    user_profile: '',
                    id: user.email,
                    uid: user.uid,
                }));
            }else{
                dispatch(logOut());
            }
        });
    };
};

const logoutFB = () => {
    return function (dispatch, getState, {history}){
        auth.signOut().then(()=>{
            dispatch(logOut());
            history.replace("/");
        });
        
    };
};


//reducer
export default handleActions ({
    [SET_USER]:(state, action) => produce(state, (draft)=>{
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state,action) => produce(state, (draft)=>{
        deleteCookie("is_login"); //쿠키 삭제
        draft.user = null; //유저 정보 비우기
        draft.is_login = false; //로그인 초기화
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => {
        
    }),


}, initialState);

// 액션 내보내기
const actionCreators = {
    setUser,
    getUser,
    logOut,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB
};
  
export { actionCreators };