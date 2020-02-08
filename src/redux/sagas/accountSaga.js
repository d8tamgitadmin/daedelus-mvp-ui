import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import * as accountApi from "../../api/accountApi";
import * as agentApi from "../../api/agentApi";

import * as ActionTypes from "../constants/accountConstants";


import {
    getUserAccounts,
    getUserAccountsSuccess,
    getUserAccountsError,
    createAccountSuccess,
    createAccountError,
    getPublicAccountsSuccess,
    getPublicAccountsError,
    deleteAccountError,
    deleteAccountSuccess
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

function* createAccountSaga(action){
    try {      
        const requestWallet = {
            key: action.account.wallets[0].walletId,
            credentialKey: action.account.wallets[0].walletKey,
        }
        const createUserWalletResponse = yield call(agentApi.CreateUserWallet, requestWallet);
        const responseWalletData = yield call([createUserWalletResponse, createUserWalletResponse.json])

        action.account.wallets[0].did = responseWalletData.did;
        action.account.wallets[0].verakey = responseWalletData.verakey;
        
        if(responseWalletData){
            const createUserAccountsResponse = yield call(accountApi.CreateUserAccounts, action.account);
            const responseData = yield call([createUserAccountsResponse, createUserAccountsResponse.json]);
            if(responseData){
                yield put(getUserAccounts(action.account.id))
                yield put(createAccountSuccess(responseData))
            } else {
                yield put(createAccountError("empty payload"))
            }
        }
    } catch(e){
        yield put(createAccountError(e))
    }
}

function* deleteAccountSaga(action){
    try {
        const deleteAccountResponse = yield call(accountApi.DeleteAccount, action.id);
        if(deleteAccountResponse){
            yield put(deleteAccountSuccess());
            yield put(getUserAccounts(action.currentUserId))
        } else {
            yield put(deleteAccountError("no account found"));
        }

    } catch(e){
        yield put(deleteAccountError(e));
    }
}

function* getPublicAccountsSaga(action){
    try {
        const publicAccountsResponse = yield call(accountApi.GetPublicAccounts);
        const responseData = yield call([publicAccountsResponse, publicAccountsResponse.json]);
        if(responseData){
            yield put(getPublicAccountsSuccess(responseData));
        } else {
            yield put(getPublicAccountsError("no accounts found."));
        }
    } catch(e){
        yield put(getPublicAccountsError(e))
    }
}



function* accountRootSaga() {
    yield takeLatest(ActionTypes.GET_USER_ACCOUNTS, getUserAccountSaga); 
    yield takeLatest(ActionTypes.CREATE_ACCOUNT, createAccountSaga);
    yield takeLatest(ActionTypes.GET_PUBLIC_ACCOUNTS, getPublicAccountsSaga);
        yield takeLatest(ActionTypes.DELETE_ACCOUNT, deleteAccountSaga);
}

export default accountRootSaga;