import React from "react";
import { Grid, Text, Image, Button, Layout } from "../elements";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Center from "./layout/Center";
import Right from "./layout/Right";
import Left from "./layout/Left";


const Post = (props) => {
  const dispatch = useDispatch();
  
  return (
    <React.Fragment>
      {props.layout === "center" ? (
        <Grid>
          <Center {...props} />
        </Grid>
      ) : props.layout === "right" ? (
        <Grid>
          <Right {...props} />
        </Grid>
      ) : (
        <Grid>
          <Left {...props} />
        </Grid>
      )}
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
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
