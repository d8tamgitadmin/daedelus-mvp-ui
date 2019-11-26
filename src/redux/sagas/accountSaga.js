import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import * as accountApi from "../../api/accountApi";
import * as ActionTypes from "../constants/accountConstants";


import {
    getUserAccountsSuccess,
    getUserAccountsError
     } 
     from "../actions/accountActions";

function* getUserAccountSaga(action) {        
    try {                
        const userAccountsResponse = yield call(accountApi.GetUserAccounts, action.userId);
        const responseData = yield call([userAccountsResponse, userAccountsResponse.json]);
        if(responseData){            
            yield put(getUserAccountsSuccess(responseData));
        } else {
            yield put(getUserAccountsError("empty payload"));
        }
        
    } catch (e) {
        yield put(getUserAccountsError(e.message));
    }
}

function* accountRootSaga() {
    yield takeLatest(ActionTypes.GET_USER_ACCOUNTS, getUserAccountSaga); 
}

export default accountRootSaga;