import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "moment";
import moment from "moment";


import {actionCreators as postActions} from "./post";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState, {history}) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user; //유저 정보 가져오기

    let comment = {
      post_id: post_id,
      user_id:user_info.uid,
      user_name:user_info.user_name,
      user_profile:user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    }

    commentDB.add(comment).then((docs)=>{ //파이어베이스에 넣어주기
      const postDB = firestore.collection("post");
      const userDoc = doc(postDB,post_id);
      const post = getState().post.list.find(l => l.id === post_id); //포스트 아이디와 같은 아이디를 가진 게시물 찾기

      //const increment = firebase.firestore.FieldValue.increment(1); //댓글 수 1 더해주는 함수

      comment = {...comment, id: docs.id};
      updateDoc(userDoc,{comment_cnt: increment(1)}).then((_post)=>{      
        dispatch(addComment(post_id, comment));

        if(post){ //포스트가 있을 경우 포스트 하나에 대한 댓글갯수를 수정 (댓글 수 숫자로 변환하기)
          dispatch(postActions.editPost(post_id, { comment_cnt: parseInt(post.comment_cnt) +1 }));
        }
      });
    });
  }
}


const getCommentFB = (post_id) => {
    return function(dispatch, getState, {history}){
      const commentDB = firestore.collection("comment");
		
      // post_id가 없으면 바로 리턴하기!
      if(!post_id){
          return;
      }
      commentDB.where("post_id", "==", post_id).orderBy("insert_dt", "desc").get().then((docs) => {
        let list = [];
        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        //   가져온 데이터를 넣어주자!
        dispatch(setComment(post_id, list));
      }).catch(err => {
          console.log("댓글 가져오기 실패!", post_id, err);
      });

    };
};


export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
  addCommentFB
};

export { actionCreators };