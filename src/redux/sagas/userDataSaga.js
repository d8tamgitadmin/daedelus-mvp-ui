import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import oktaAuth from "../../okta/index";

import * as authApi from "../../api/userDataApi";
import * as ActionTypes from "../constants/authConstants";

/*
response is not a promise, but rather the value that fetch promise is resolved with. 
But response.json() returns promise. To wait for it to be resolved we use call effect. 
That combined with yield waits for promise returned by response.json() to be resolved (or rejected).

*/

import {
oktaLoginSuccess,
oktaLoginReplay,
getUserDataSuccess,
getUserDataError
 } 
 from "../actions/authActions";


 function* onOktaLogin(action){
    try {
       debugger;
      const response = yield call(oktaAuth.signIn,{username:action.username, password:action.password});
      console.log(response);
      debugger;
      if(response){
         const userData = yield call(oktaAuth.getUserData);
       debugger;
         yield put(oktaAuth.redirect,{sessionToken: response.sessionToken})
         yield put(oktaLoginSuccess(userData));
      } else {
         yield put(getUserDataError("failed login"));
      }

    }catch (e) {
       yield put(getUserDataError(e.message));
    }
 }


function* fetchUserData(action) {
    try {      
      
       const userDataResponse = yield call(authApi.PostUserData, action.currentUser);
       const responseData = yield call([userDataResponse, userDataResponse.json]);
       if(responseData){
         yield put(getUserDataSuccess(responseData));
       } else {
         yield put(getUserDataError("empty payload"));
       }
      
    } catch (e) {
       yield put(getUserDataError(e.message));
    }
 }

 function* userDataSaga() {
   yield takeLatest(ActionTypes.OKTA_LOGIN, onOktaLogin);
    yield takeLatest(ActionTypes.OKTA_LOGIN_SUCCESS, fetchUserData );

  }
  
  export default userDataSaga;