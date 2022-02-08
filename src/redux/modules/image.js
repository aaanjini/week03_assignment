import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading)=>({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url)=>({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview)=>({preview}));


// initial state
const initialState = {
    image_url: "http://via.placeholder.com/400x300",
    uploading: false,
    preview: null,
};

const uploadImageFB = (image) => {
    return function (dispatch, getState, {history}){
        dispatch(uploading(true)); //업로드 중이다!

        const _upload = storage.ref(`images/${image.name}`).put(image); //스토리지에 이미지 저장하기

        _upload.then((snapshot)=>{
            snapshot.ref.getDownloadURL().then((url) => {
                //console.log(url);
                dispatch(uploadImage(url));
            });
            
        }).catch((error)=>{
            console.log('이미지 업로드 실패 ',error);
            dispatch(uploading(false));
        });
    }

};



export default handleActions ({
    [UPLOADING]: (state,action) => produce(state, (draft)=>{
        draft.uploading = action.payload.uploading;
    }),
    [UPLOAD_IMAGE]: (state,action) => produce(state, (draft)=>{
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
    }),
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview;
    }),
}, initialState);


const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
};

export {actionCreators};