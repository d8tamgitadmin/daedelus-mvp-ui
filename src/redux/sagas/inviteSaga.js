import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import oktaAuth from "../../okta/index";

import * as inviteApi from "../../api/inviteApi";
import * as agentApi from "../../api/agentApi";

import * as ActionTypes from "../constants/invitationConstants";


import {
    getSourceInvites,
    getSourceInvitesError,
    getSourceInvitesSuccess,
    getTargetInvites,
    getTargetInvitesError,
    getTargetInvitesSuccess,
    createAccountLinkError,
    createAccountLinkSuccess,
    rejectInviteError,
    rejectInviteSuccess,
    acceptInviteError,
    acceptInviteSuccess,
    getAccountLinks,
    getAccountLinksError,
    getAccountLinksSuccess
    
} from "../actions/invitationActions";

function* getSourceInvitesSaga(action){
    try {
        const sourceInvitesResponse = yield call(inviteApi.GetSourceInvites, action.sourceAccountId);
        const responseData = yield call([sourceInvitesResponse, sourceInvitesResponse.json]);
        if(responseData){
            yield put(getSourceInvitesSuccess(responseData));
        } else {
            yield put(getSourceInvitesError("no source invites found."));
        }
    } catch(e){
        yield put(getSourceInvitesError(e))
    }
}

function* getTargetInvitesSaga(action){
    try {
        const targetInvitesResponse = yield call(inviteApi.GetTargetInvites, action.targetAccountId);
        const responseData = yield call([targetInvitesResponse, targetInvitesResponse.json]);
        if(responseData){
            yield put(getTargetInvitesSuccess(responseData));
        } else {
            yield put(getTargetInvitesError("no source invites found."));
        }
    } catch(e){
        yield put(getTargetInvitesError(e))
    }
}

function* createInviteLinkSaga(action){

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
        // todo generate a new did, and key each time
        let request = {
            walletName: currentAccount.wallets[0].walletId,
            walletCredentials:currentAccount.wallets[0].walletKey,
            walletkey: currentAccount.wallets[0].walletId,
        }
        // Generate new Wallet DID and Verakey, specify wallet key and credentials
        const createNewDIDResponse = yield call(agentApi.CreateRelationshipRequest,request);
        const createNewDIDResponseData = yield call([createNewDIDResponse, createNewDIDResponse.json]);
        if(createNewDIDResponseData){
            let invite = {
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
            if(createNewInviteResponseData){
                yield put(createAccountLinkSuccess(createNewInviteResponseData))
            } else {
                yield put(createAccountLinkError("Failed"));
            }
        } else {
            yield call(createAccountLinkError("Failed to Create Nym Request on ledger"));
        }
    } catch(e){
        yield put(createAccountLinkError(e));
    }
}

function* rejectAccountLinkSaga(action){
    try {
        const rejectAccountLinkResponse = yield call(inviteApi.DeleteInvite, action.invitationId);
        const rejectAccountLinkResponseData = yield call([rejectAccountLinkResponse,rejectAccountLinkResponse.json]);
        if(rejectAccountLinkResponseData) {
            yield put(getSourceInvites(action.accountId));
            yield put(getTargetInvites(action.accountId));
            yield put(rejectInviteSuccess());
        } else {
            yield put(rejectInviteError("Failed to delete invite"));
        }
    } catch(e){
        yield put(rejectInviteError(e));
    }
}

// most import code of the platform right here:
function* acceptAccountLinkSaga(action) {
    let {invitation, account} = action;
debugger;
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

        // first ledger business
        /*
         public String targetWalletkey;

    public String targetWalletCredentials;

    public String sourceDID;

    public String sourceVerkey;
    */
    let connectionResolveDto = {
            targetWalletkey: account.wallets[0].walletId,
            targetWalletCredentials: account.wallets[0].walletKey,
            sourceDID: invitation.RequestingDID,
            sourceVerkey: invitation.RequestingVerkey,
    };
    debugger;
    const createLinkResponse = yield call(agentApi.CreateLinkResponse, connectionResolveDto);
    const createLinkResponseData = yield call([createLinkResponse, createLinkResponse.json]);
    if(createLinkResponseData){
        /*
         public long id;

    public long firstAccountId;

    public long secondAccountId;

    public String did;

    public String firstAccountDid;

    public String secondAccountDid;

    @Column(length=10000)
    public String nymResponse;

    public Date created;

    public Date modified;
    */
        let accountLink = {
            id:0,
            firstAccountId: invitation.sourceAccountId,
            secondAccountId: invitation.targetAccountId,
            firstAccountDid: invitation.RequestingDID,
            secondAccountDid: account.wallets[0].did,
            nymResponse:createLinkResponseData.nymResponse,
            created:generateDate(),
            modified: generateDate()
        };
        debugger;
        const createAccountLinkResponse = yield call(inviteApi.CreateAccountLink, accountLink);
        const createAccountLinkResponseData = yield call([createAccountLinkResponse,createAccountLinkResponse.json]);
        if(createAccountLinkResponseData){

            const deleteInviteResponse = yield call(inviteApi.DeleteInvite, invitation.id);
            const deleteInviteResponseData = yield call([deleteInviteResponse,deleteInviteResponse.json]);
            if(deleteInviteResponseData){
                // all done
                yield put(getSourceInvites(account.id));
                yield put(getTargetInvites(account.id));
                yield put(getAccountLinks(account.id));
                yield put(acceptInviteSuccess());
            } else {
                yield put(acceptInviteError("Failed to delete invitation"))
            }
        } else {
            yield put(acceptInviteError("Failed to create account Link after ledger"))
        }

    } else {
        yield put(acceptInviteError("Failed to accept Nym Request"));
    }

        // second create account link

        // third delete invite

    } catch(e){
        yield put(acceptInviteError(e));
    }
}

function* getAccountLinksSaga(action){
    try {
        const getAccountLinkResponse = yield call(inviteApi.GetAccountLinks, action.accountId);
        const getAccountLinkeResponseData = yield call([getAccountLinkResponse,getAccountLinkResponse.json]);
        if(getAccountLinkeResponseData){
            yield put(getAccountLinksSuccess(getAccountLinkeResponseData));
        } else {
            yield put(getAccountLinksError("Failed to get account links"))
        }

    } catch(e){
        yield put(getAccountLinksError(e));
    }
}

// Define Free Zone
// Invitations -> Account Links
function* inviteRootSaga() {
    yield takeLatest(ActionTypes.GET_SOURCE_INVITES, getSourceInvitesSaga); 
    yield takeLatest(ActionTypes.GET_TARGET_INVITES, getTargetInvitesSaga);
    yield takeLatest(ActionTypes.CREATE_ACCOUNT_LINK, createInviteLinkSaga);
    yield takeLatest(ActionTypes.REJECT_ACCOUNT_LINK, rejectAccountLinkSaga);
    yield takeLatest(ActionTypes.ACCEPT_ACCOUNT_LINK, acceptAccountLinkSaga);
    yield takeLatest(ActionTypes.GET_ACCOUNT_LINKS, getAccountLinksSaga)
   
}

export default inviteRootSaga;