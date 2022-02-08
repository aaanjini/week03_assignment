import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import { doc, updateDoc } from "firebase/firestore";


const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";

const setLike = createAction(SET_LIKE, (post_id, user_id)=>({post_id, user_id}));
const addLike = createAction(ADD_LIKE, (post_id, user_id)=>({post_id, user_id}));

const initialState = {
    list: {},
};


export default handleActions ({
    [SET_LIKE]: (state,action) => produce (state, (draft)=>{

    }),
    [ADD_LIKE]: (state,action) => produce (state, (draft)=>{

    }),
},initialState);


const actionCreators = {
    setLike,
    addLike,
};

export {actionCreators};