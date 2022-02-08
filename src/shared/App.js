import './App.css';
import React from "react";

import {Route} from "react-router-dom";
import {Grid,Button} from "../elements/index";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Header from '../components/Header';
import Permit from './Permit';
import PostList from "../pages/PostList";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';

import { useDispatch } from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user';
import { apiKey } from "../shared/firebase";




function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  React.useEffect(()=>{
    if(is_session){
        dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (    
      <React.Fragment>
        <Grid margin="0 auto">
          <Header/>
          <Grid padding="16px">          
            <ConnectedRouter history={history}>
              <Route path="/" exact component={PostList}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/write" exact component={PostWrite}/>
              <Route path="/write/:id" exact component={PostWrite}/>
              <Route path="/post/:id" exact component={PostDetail}/>
            </ConnectedRouter>
          </Grid>
        </Grid>
    
        <Permit>
          <Button is_float text="+" _onClick={()=>{history.push('/write')}}></Button>
        </Permit>
      </React.Fragment>
  );
}

App.defaultProps = {
  
}
export default App;