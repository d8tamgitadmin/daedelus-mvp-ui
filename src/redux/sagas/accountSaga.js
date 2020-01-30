import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import * as accountApi from "../../api/accountApi";
import * as agentApi from "../../api/agentApi";
import * as inviteApi from "../../api/inviteApi";
import * as ActionTypes from "../constants/accountConstants";


import {
    getUserAccounts,
    getUserAccountsSuccess,
    getUserAccountsError,
    createAccountSuccess,
    createAccountError,
    getPublicAccountsSuccess,
    getPublicAccountsError,
    createAccountLinkSuccess,
    createAccountLinkError
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

function* createAccountLinkSaga(action){

        const generateDate = () => {
            const today = new Date();
            let dd = today.getDate().toString();
            let mm = (today.getMonth()+1).toString(); 
            let yyyy = today.getFullYear().toString();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 
            return yyyy+"-"+mm+"-"+dd;
    }

    try {

        let {currentAccount, targetAccount} = action;
        let request = {
            walletName: currentAccount.wallets[0].walletId+targetAccount.id,
            walletCredentials:"{}",
            walletkey: currentAccount.wallets[0].walletKey+targetAccount.id,
        }

        // Generate new Wallet DID and Verakey, specify wallet key and credentials
        const createNewDIDResponse = yield call(agentApi.CreateRelationshipRequest,request);
        const createNewDIDResponseData = yield call([createNewDIDResponse, createNewDIDResponse.json]);

        // Construct Invite with new did, verkey, and nonce
        debugger;
        let invite ={
            sourceAccountId: currentAccount.id,
            RequestingDID: createNewDIDResponseData.did,
            RequestingVerkey: createNewDIDResponseData.verkey,
            nonce:createNewDIDResponseData.nonce,
            targetAccountId: targetAccount.id,
            ResponseDID:"",
            ResponseVerkey:"",
            status: "Pending",
            "created": generateDate(),
            "modified": generateDate()
        };
        const createNewInviteResponse = yield call(inviteApi.CreateInvite, invite);
        const createNewInviteResponseData = yield call([createNewInviteResponse, createNewInviteResponse.json]);
        debugger;
        if(createNewInviteResponseData){
            yield put(createAccountLinkSuccess(createNewInviteResponseData))
        } else {
            yield put(createAccountLinkError("Failed"));
        }

    } catch(e){
        yield put(createAccountLinkError(e));
    }
}

function* accountRootSaga() {
    yield takeLatest(ActionTypes.GET_USER_ACCOUNTS, getUserAccountSaga); 
    yield takeLatest(ActionTypes.CREATE_ACCOUNT, createAccountSaga);
    yield takeLatest(ActionTypes.GET_PUBLIC_ACCOUNTS, getPublicAccountsSaga);
    yield takeLatest(ActionTypes.CREATE_ACCOUNT_LINK, createAccountLinkSaga);
}

export default accountRootSaga;