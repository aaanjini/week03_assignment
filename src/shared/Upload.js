import React from "react";
import styled from "styled-components";
import { storage } from "./firebase";
import { Grid, Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as imageActions } from "../redux/modules/image";
const Upload = (props) => {
    const dispatch = useDispatch();
    const uploading = useSelector((state) => state.image.uploading);
    const fileInput = React.useRef(); //input 에 접근하기
    const value = document.querySelector('.upload-name');

    

    const selectFile = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        //디자인 커스텀 인풋에 value 넣기
        document.querySelector('.upload-name').value = file.name;

        reader.readAsDataURL(file); //파일 내용 읽어오기        
        // onloadend: 읽기가 끝나면 발생하는 이벤트 핸들러
        reader.onloadend = () => {
            // reader.result는 파일의 컨텐츠(내용물)입니다!
            dispatch(imageActions.setPreview(reader.result));
        };
    };

    const uploadFB = () => {
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));        
    };

    return (
        <React.Fragment>           
            <FileBox className="filebox">
                <input className="upload-name" id="upload-name" placeholder="첨부파일" disabled/>
                <label for="file">파일찾기</label>
                <input type="file" id="file" ref={fileInput} onChange={selectFile}/>
            </FileBox>
            {/* <input type="file" ref={fileInput} onChange={selectFile}/> */}
            {/* <Button text="업로드" _onClick={uploadFB} width="80px"></Button> */}
        </React.Fragment>
    )
}

const FileBox = styled.div`
    position: relative;
    margin-bottom: 10px;
    .upload-name {
        display: inline-block;
        width: calc(100% - 103px);
        height: 40px;
        padding: 0 10px;
        vertical-align: middle;
        border: 1px solid #dddddd;
        color: #999999;
    }
    label {
        display: inline-block;
        width: 70px;
        color: #fff;
        vertical-align: middle;
        background-color: #999999;
        cursor: pointer;
        height: 40px;
        margin-left: 10px;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
        line-height: 40px;
    }
    input[type="file"] {
        position: absolute;
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;
        border: 0;
    }
`;

export default Upload;