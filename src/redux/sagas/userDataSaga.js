import { call, put, select, takeLatest } from 'redux-saga/effects';


import * as authApi from "../../api/userDataApi";
import * as ActionTypes from "../constants/authConstants";


import {
oktaLoginSuccess,
getUserDataSuccess,
getUserDataError
 } 
 from "../actions/authActions";

function* fetchUserData(action) {
    try {      
       const userData = yield call(authApi.PostUserData, action.currentUser);
       yield put(getUserDataSuccess(userData));
    } catch (e) {
       yield put(getUserDataError(e.message));
    }
 }

 function* userDataSaga() {
    yield takeLatest(ActionTypes.OKTA_LOGIN_SUCCESS,fetchUserData );

  }
  
  export default userDataSaga;