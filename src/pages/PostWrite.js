import React from "react";
import {Grid, Text, Button, Image, Input, Layout} from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);

    //포스트 아이디 가져오기
    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false; 

    //console.log(post_id);
    const { history } = props;

    //리스트에서 지금 들어온 포스트 아이디와 같은 거 찾기
    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

    //console.log("포스트확인",_post);

    const [contents, setContents] = React.useState(_post ? _post.contents : "");
    const [layout, setLayout] = React.useState("center");
    
    React.useEffect(() => {
      if (is_edit && !_post) { //수정하기 페이지인데 포스트정보가 없을 경우
        console.log("포스트 정보가 없어요!");
        history.goBack();
  
        return;
      }
  
      if (is_edit) { //수정 페이지라면
        dispatch(imageActions.setPreview(_post.image_url)); //프리뷰 가져오기
      }
    }, []);

    const changeContents =  (e) => {
      setContents(e.target.value);
    };

    const changeLayout = (e) => {
      setLayout(e.target.value);
    };

    const addPost = () => {
      dispatch(postActions.addPostFB(contents,layout));

    };

    const editPost = () => { //수정하기 버튼 누르면 포스트 아이디랑 콘텐츠 전송
      dispatch(postActions.editPostFB(post_id, {contents: contents, layout: layout,}));
    };


    if(!is_login){
      return(
        <Grid padding="16px">
          <Text size="40px" bold>잠깐만요!</Text>
          <Text>로그인 후에만 글을 쓸 수 있습니다!</Text>
          <Button text="로그인 하러 가기" _onClick={()=>{
            history.replace("/login");
          }}></Button>
        </Grid>
      );
    }

    return (
      <React.Fragment>
        <Grid bg="#fff" padding="16px" radius="10px">
          <Grid margin="0 0 20px 0">
            <Text margin="0px 0 20px 0" size="36px" bold>
              {is_edit ? "게시글 수정🖍" : "게시글 작성🖍"}
            </Text>
            <Upload/>
          </Grid>
          <Grid margin="0 0 20px 0">
            <Text bold size="25px">레이아웃 미리보기</Text>
            <Text bold size="16px" margin="0 0 10px 0">
              ✨레이아웃을 선택해주세욥✨
            </Text>
            <label>
              <input type="radio" value="center" name="layout" onClick={changeLayout}></input>
              중앙
            </label>
            <label>              
              <input type="radio" value="left" name="layout" onClick={changeLayout}></input>
              왼쪽
            </label>
            <label>
              <input type="radio" value="right" name="layout" onClick={changeLayout}></input>
              오른쪽
            </label>
          </Grid>     


          {layout === "center" ? (
            <Layout contents={contents? contents : "중앙 레이아웃 미리보기"} preview={preview ? preview : "http://via.placeholder.com/400x300"} layout="center"/>
          ) : layout === "right" ? (            
            <Layout contents={contents? contents : "오른쪽 레이아웃 미리보기"} preview={preview ? preview : "http://via.placeholder.com/400x300"} layout="right"/>            
          ) : (
            <Layout contents={contents? contents : "왼쪽 레이아웃 미리보기"} preview={preview ? preview : "http://via.placeholder.com/400x300"} layout="left"/>
          )}      

          <Grid margin="0 0 20px 0">
            <Input 
              value={contents} 
              _onChange={changeContents} 
              label="게시글 내용" 
              placeholder="게시글 작성" 
              multiLine 
            />
          </Grid>

          <Grid >
            {is_edit ? (
              <Button text="게시글 수정" _onClick={editPost}></Button>
            ) : (
              <Button text="게시글 작성" _onClick={addPost}></Button>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
}



export default PostWrite;