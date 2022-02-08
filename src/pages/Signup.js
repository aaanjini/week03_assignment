import React from "react";
import { Grid , Text, Input, Button} from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
const Signup = (props) => {
    const dispatch = useDispatch();
    const [id,setId] = React.useState('');
    const [pwd,setPwd] = React.useState('');
    const [pwd_check,setPwdCheck] = React.useState('');
    const [user_name,setUserName] = React.useState('');

    const signup = () => {
        if(id === '' || pwd === '' || user_name === ''){ //input 값이 비었을 때
            window.alert('필수 값을 모두 채워주세요.');
            return;
        }
        if(pwd !== pwd_check){ //비밀번호와 비밀번호 체크가 같은 지 체크
            window.alert('비밀번호가 다릅니다.');
            return;
        }       
        dispatch(userActions.signupFB(id,pwd,user_name));
    }

    return(
        <React.Fragment>
            <Grid padding="16px" bg="#fff" radius="10px" >
                <Text bold size="40px">회원가입</Text>
                <Grid margin="0 0 20px 0">
                    <Input 
                        radius="5px"
                        label="아이디" 
                        placeholder="이메일을 입력해주세요."
                        _onChange={(e)=>{
                            setId(e.target.value);
                        }}
                    ></Input>
                </Grid>
                <Grid margin="0 0 20px 0">
                    <Input 
                        radius="5px"
                        label="닉네임" 
                        placeholder="닉네임을 입력해주세요."
                        _onChange={(e)=>{
                            setUserName(e.target.value);
                        }}
                    ></Input>
                </Grid>
                <Grid margin="0 0 20px 0">
                    <Input 
                        radius="5px"
                        type="password"
                        label="비밀번호" 
                        placeholder="8자 이상의 비밀번호를 입력해주세요"
                        _onChange={(e)=>{
                            setPwd(e.target.value);
                        }}
                    ></Input>
                </Grid>
                <Grid margin="0 0 40px 0">
                    <Input 
                        radius="5px"
                        type="password"
                        label="비밀번호 확인" 
                        placeholder="비밀번호를 확인해주세요."
                        _onChange={(e)=>{
                            setPwdCheck(e.target.value);
                        }}
                    ></Input>
                </Grid>
                <Button text="회원가입" _onClick={signup}></Button>
            </Grid>
        </React.Fragment>
    );
};

export default Signup;