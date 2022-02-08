import React from "react";
import { useDispatch , useSelector } from "react-redux";
import { Grid, Button, Image, Text } from "../elements"; 
import { getCookie, deleteCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { actionCreators as userActions} from "../redux/modules/user";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const user_info = useSelector((state) => state.user.user);

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key)? true : false;
   

    if(is_login){ // 로그인이 됐다면
        return(
            <React.Fragment>
                <Grid is_flex padding="8px 16px">
                    <Grid is_flex>
                        <Button width="80px" text="홈" _onClick={()=>{
                            history.push("/");
                        }}></Button>
                    </Grid>
                    <Grid is_flex width="auto">
                        <Grid is_flex width="max-content">
                            <Image shape="circle" src={props.src} />
                            <Text bold margin="0 10px 0 0">{user_info.user_name}</Text>
                        </Grid>                        
                        <Button 
                            width="80px"
                            text="로그아웃" 
                            _onClick={()=> {
                                console.log("로그아웃누름");
                                dispatch(userActions.logoutFB());
                            }}>
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
    return(
        <React.Fragment>
            <Grid is_flex padding="8px 16px">
                <Grid is_flex>
                    <Button width="80px" text="홈" _onClick={()=>{
                        history.push("/");
                    }}></Button>
                </Grid>
                <Grid is_flex>
                    <Button text="로그인" _onClick={()=> {
                        history.push('/login');
                    }}></Button>
                    <Button text="회원가입" _onClick={()=> {
                        history.push('/signup');
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
       

}

Header.defaultProps = {
    user_info: {
        user_name: "jini",
        user_profile:
        "http://cdn.edujin.co.kr/news/photo/202102/35063_66368_1421.jpg",
    },
    image_url: "http://cdn.edujin.co.kr/news/photo/202102/35063_66368_1421.jpg",
};

export default Header;