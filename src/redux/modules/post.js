import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";
import { firestore, storage, db } from "../../shared/firebase";
import { getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";
import { collection, doc, addDoc, updateDoc, deleteDoc, query, orderBy, limit, startAt, increment} from "firebase/firestore";
import { getDatabase,
    ref as reref,
    onValue,
    child,
    update,
    set,
    push, 
} from "firebase/database";
import {actionCreators as imageActions} from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id,post}));
const deletePost = createAction(DELETE_POST, (post_list)=>({post_list}));

const initialState = {
    list: [],
};

const initialPost = {
    image_url: "http://cdn.edujin.co.kr/news/photo/202102/35063_66368_1421.jpg",
    contents: "",
    comment_cnt: 0,
    like_cnt:0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    layout: "center",
};


const getPostFB = () => {
    return async function(dispatch, getState, {history}){
        const postDB = firestore.collection("post");          
        let query = postDB.orderBy("insert_dt", "desc"); //시간순으로 정렬하기       

        query.get().then((docs)=>{
            let post_list = [];           

            docs.forEach((doc)=>{
                //console.log(doc.id, doc.data());    

                //데이터 모양 맞춰주기  
                let _post = doc.data();
                let post = Object.keys(_post).reduce((acc, cur)=>{
                    if(cur.indexOf("user_") !== -1){
                        return {
                            ...acc, 
                            user_info: {...acc.user_info, [cur]: _post[cur]}
                        };
                    }
                    return {
                        ...acc, 
                        [cur]: _post[cur]};
                }, {id: doc.id, user_info: {}});

                post_list.push(post);
            });            

            //console.log(post_list);
            dispatch(setPost(post_list));
        });        
        
    };
};

const addPostFB = (contents="", layout="center") => {
    return async function(dispatch, getState, {history}){
        const postDB = firestore.collection("post"); 
        const _user = getState().user.user;       

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };
        const _post = {
            ...initialPost,
            contents: contents,
            layout: layout,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss")
        };

        const _image = getState().image.preview; 
        //console.log(_image);

        //이미지명 중복처리
        const storageRef = ref(storage,`images/${user_info.user_id}_${new Date().getTime()}`);
        const _upload = uploadString(storageRef, _image, 'data_url');

        _upload.then(() => {
            getDownloadURL(storageRef).then((url) => {
                dispatch(imageActions.uploadImage(url));
                return url;
            }).then((url)=>{
                addDoc(collection(db, "post"), {...user_info,..._post, image_url: url}).then((doc)=>{
                    let post = {user_info, ..._post, id: doc.id, image_url: url};
                    dispatch(addPost(post));
                    history.replace("/");    
                }).catch((error)=>{
                    console.log('포스트 작성 실패', error);
                });
            }).catch((error)=>{
                window.alert('이미지 업로드에 실패했습니다.');
                console.log(error);
            });
        });
    };
}; 

const editPostFB = (post_id = null, post = {}) => {
    return function(dispatch, getState, {history}){
        if(!post_id){
            console.log("게시물 정보가 없습니다.");
            return;
        }

        const _image = getState().image.preview;
        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];
        const postDB = firestore.collection("post");
        const userDoc = doc(postDB,post_id);

        if (_image === _post.image_url) {            
            updateDoc(userDoc,post).then((doc)=>{
                dispatch(editPost(post_id, { ...post }));
                history.replace("/");
                history.go(0);
            });
            return;   
        }else{
            const user_id = getState().user.user.uid;
            const storageRef = ref(storage,`images/${user_id}_${new Date().getTime()}`);
            const _upload = uploadString(storageRef, _image, 'data_url');

            _upload.then(() => {
                getDownloadURL(storageRef).then((url) => {
                    //dispatch(imageActions.uploadImage(url));
                    return url;
                }).then((url)=>{
                    updateDoc(userDoc, {...post, image_url: url}).then((doc)=>{
                        dispatch(editPost(post_id, { ...post, image_url: url }));
                        history.replace("/");
                        history.go(0);
                    }).catch((error)=>{
                        console.log('포스트 작성 실패', error);
                    });
                }).catch((error)=>{
                    window.alert('이미지 업로드에 실패했습니다.');
                    console.log(error);
                });
            });
        }
    }
};

const getOnePostFB = (id) => {
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post");
        postDB.doc(id).get().then((doc) => {            
            let _post = doc.data();
            let post = Object.keys(_post).reduce(
            (acc, cur) => {
                if (cur.indexOf("user_") !== -1) {
                return {
                    ...acc,
                    user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
                }
                return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
            );

            dispatch(setPost([post]));
        });
    }
};


const deletePostFB = (post_id = null, post_list = []) => {
    return async function (dispatch, getState, {history}) {
        if (!post_id) {
            window.alert("게시물을 불러올 수 없습니다.");
            console.log("delete reducer 오류");
            return;
        }

        //const postDB = firestore.collection("post");

        const post_index = getState().post.list.findIndex(
            (item) => item.id === post_id
          );
        const _post = getState().post.list.filter((item, index) => {
            return index !== post_index;
        });
        
        deleteDoc(doc(db, "post",post_id)).then(
            history.replace("/"), dispatch(deletePost(_post))
        ).catch((error) => 
            console.log(error , "포스트삭제 에러")
        );
    }
};

const likeFB = (post_id, state = false, like_cnt) => {
    return function (dispatch, getState, { history }) {
        const user = getState().user.user.uid;

        const redb = getDatabase();
        const dbRef = reref(redb, `like/${post_id}/${user}`);
        const postDB = firestore.collection("post");

        set(dbRef, {
            state: !state,
        }).then(() => {
            const postDoc = doc(postDB, post_id);
            updateDoc(postDoc, { like_cnt: increment(state ? -1 : 1) }).then(() => {
                dispatch(editPost(post_id, { like_cnt: like_cnt + (state ? -1 : 1) }));
            });
        });
    };
};

//아이템 인덱스


export default handleActions({
    [SET_POST]: (state,action) => produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        // post_id가 같은 중복 항목을 제거합시다! :)
        draft.list = draft.list.reduce((acc, cur) => {
            // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인해요!
            // 있으면? 덮어쓰고, 없으면? 넣어주기!
            if (acc.findIndex((a) => a.id === cur.id) === -1){
                return [...acc, cur];
            }else{
                acc[acc.findIndex((a) => a.id === cur.id)] = cur;
                return acc;
            }
        }, []);  
        // paging이 있을 때만 넣기
        if (action.payload.paging) {
            draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
    }),
    [ADD_POST]: (state,action) => produce(state, (draft)=>{
        draft.list.unshift(action.payload.post);
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) =>{
        draft.list = action.payload.post_list;
    }),
    
 }, initialState);


const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    editPostFB,
    getOnePostFB,
    deletePostFB,
    likeFB,
};

export {actionCreators};