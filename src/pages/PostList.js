import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Grid } from "../elements";
import "../shared/App.css";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    //console.log(post_list, user_info);
    const {history} = props;
 

    React.useEffect(()=>{
        if(post_list.length < 2){
            dispatch(postActions.getPostFB());
        }     
         
    },[]);

    
    return(
        <React.Fragment>            
            {post_list.map((p, idx) => {
                if(user_info && p.user_info.user_id === user_info.uid){
                    return (
                        <Grid
                            cursor="pointer"
                            bg="#ffffff"
                            margin="8px 0px"
                            radius="10px"
                            key={p.id}                           
                        >
                            <Post key={p.id} {...p} is_me/>
                        </Grid>
                    );
                }else{
                    return(
                        <Grid
                            key={p.id}
                            bg="#ffffff"
                            radius="10px"
                        >
                            <Post {...p} />
                        </Grid>
                    );                    
                }
            })}
        </React.Fragment>
    );

}


export default PostList;