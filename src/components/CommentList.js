import React from "react";
import {Grid, Image, Text} from "../elements";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as commentActions} from "../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);
  
  const {post_id} = props;

  React.useEffect(() => {
    if(!comment_list[post_id]){
      // 코멘트 정보가 없으면 불러오기
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);

  // comment가 없거나, post_id가 없으면 아무것도 안넘겨준다!
  if(!comment_list[post_id] || !post_id){
    return null;
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[post_id].map(c => {
          return(<CommentItem key={c.id} {...c}/>);
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  post_id: null
};

export default CommentList;

const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
    return (
        <Grid is_flex margin="0 0 10px 0">
          <Grid is_flex width="auto">
            <Grid is_flex width="auto" margin="0 10px 0 0">
              <Image shape="circle"/>
              <Text bold>{user_name}</Text>
            </Grid>             
            <Text margin="0px">{contents}</Text>            
          </Grid>                     
          
          
          <Text margin="0px" size="10px" color="#999">{insert_dt}</Text>   
          
                 
        </Grid>
    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "jini",
    user_id: "",
    post_id: 1,
    contents: "집에 있는데 집가고싶음",
    insert_dt: '2021-01-01 19:00:00'
}