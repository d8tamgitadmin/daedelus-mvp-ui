import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import oktaAuth from "../../okta/index";

import * as inviteApi from "../../api/inviteApi";
import * as agentApi from "../../api/agentApi";

import * as ActionTypes from "../constants/invitationConstants";


import {
    getSourceInvitesError,
    getSourceInvitesSuccess,
    getTargetInvitesError,
    getTargetInvitesSuccess,
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

function* inviteRootSaga() {
    yield takeLatest(ActionTypes.GET_SOURCE_INVITES, getSourceInvitesSaga); 
    yield takeLatest(ActionTypes.GET_TARGET_INVITES, getTargetInvitesSaga);
   
}

export default inviteRootSaga;