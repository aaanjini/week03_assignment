import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";
import { setCookie } from "../shared/Cookie";
import { emailCheck } from "../shared/common";

import {actionCreators as userActions} from '../redux/modules/user';

const Login = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {
    console.log("로그인 누름");    

    if (id === "" || pwd === "") {
      window.alert("아이디/비밀번호를 입력해주세요.");
      return;
    }
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px" bg="#fff" radius="10px">
        <Text bold size="40px">
          로그인
        </Text>
        <Grid margin="0 0 20px 0">
          <Input
            radius="5px"
            label="아이디"
            placeholder="이메일을 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          ></Input>
        </Grid>
        <Grid margin="0 0 40px 0">
          <Input
            radius="5px"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          ></Input>
        </Grid>
        <Button
          text="로그인하기"
          _onClick={() => {
            login();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
