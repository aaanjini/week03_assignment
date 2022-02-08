import React from "react";
import { Grid, Text, Image, Button, Layout } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector} from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { FaHeart } from "react-icons/fa";

const Post = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const [like, setLike] = React.useState(false);  // 좋아요 초기값

  let login_user = useSelector((state) => state.user.user);
  login_user = login_user !== null ? login_user.uid : login_user;

  React.useEffect(() => {
    if (user_info?.uid) {
      const db = getDatabase();
      const likeRef = ref(db, `like/${props.id}/${user_info.uid}`);

      onValue(likeRef, (snapshot) => {
        if (snapshot.val()) {
          setLike(snapshot.val()?.state);
        } else {
          update(likeRef, { state: false });
        }
      });
    } else {
      return false;
    }
  }, [user_info]);

  const likeAction = () => {
    dispatch(postActions.likeFB(props.id, like, props.like_cnt));
  };


  return (
    <React.Fragment>
      <Grid radius="10px" margin="0 0 20px 0" bg="#fff">
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Button
                text="수정"
                width="40px"
                padding="7px"
                margin="0 0 0 10px"
                bg="#fff"
                color="#000"
                border="1px solid #000"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              ></Button>
            )}
            {props.is_me && (
              <Button
                text="삭제"
                width="40px"
                padding="7px"
                margin="0 0 0 10px"
                bg="#fff"
                color="red"
                border="1px solid red"
                _onClick={() => {
                  dispatch(postActions.deletePostFB(props.id));
                }}
              ></Button>
            )}
          </Grid>
        </Grid>   
        <Grid _onClick={() => {
          history.push(`/post/${props.id}`);
        }}>     
          <Layout contents={props.contents} preview={props.image_url} layout={props.layout}/>
        </Grid>  
        <Grid is_flex padding="16px">
          <Grid>
            <Text bold inline_block margin="1em 5px 1em 0">
                좋아요 {props.like_cnt}개
            </Text>
            <Text bold inline_block>
              댓글 {props.comment_cnt}개
            </Text>
          </Grid>
          
          <Button            
            width="40px" 
            bg="transparent" 
            color={like ? "red" : "gray"}
            size="25px"
            _onClick={likeAction}
        ><FaHeart/></Button>
        </Grid>
      </Grid>      
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "jini",
    user_profile:
      "http://cdn.edujin.co.kr/news/photo/202102/35063_66368_1421.jpg",
  },
  image_url: "http://cdn.edujin.co.kr/news/photo/202102/35063_66368_1421.jpg",
  contents: "스폰지밥이네여!",
  comment_cnt: 0,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
  like_cnt: 0,
  layout:"center",
};

export default Post;
