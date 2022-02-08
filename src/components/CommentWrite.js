import React from "react";
import {Grid, Input, Button} from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";


const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState();
  const {post_id} = props;

  const onChange = (e) => { //인풋 값 가져오기
    setCommentText(e.target.value);
  };

  const write = () => { // 데이터를 보내주는 댓글작성 함수
    console.log(comment_text);
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText(''); //댓글 다 작성시 인풋 비워주기   
  };

  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input 
          placeholder="댓글 내용을 입력해주세요 :)"  
          radius="5px"
          _onChange={onChange}
          value={comment_text}
          onSubmit={write}
          is_submit
        />
        <Button width="50px" margin="0px 2px 0px 2px" _onClick={write}>작성</Button>
      </Grid>
    </React.Fragment>
  );
}

export default CommentWrite;

