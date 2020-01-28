import * as constants from "../constants/invitationConstants";
import { GetTargetInvites } from "../../api/inviteApi";

export function createInvitation(invitation){
    return {
        type: constants.CREATE_INVITATION,
        invitation: invitation
    }
}

export function createInivitationSuccess(invitation){
    return {
        type: constants.CREATE_INVITATION_SUCCESS,
        invitation: invitation
    }
}

export function createInvitationError(error){
    return {
        type: constants.CREATE_INVITATION_ERROR,
        error: error
    }
}

export function getSourceInvites(sourceAccountId) {
    return {
        type: constants.GET_SOURCE_INVITES,
        sourceAccountId: sourceAccountId
    }
}

export function getSourceInvitesSuccess(invites){
    return {
        type: constants.GET_SOURCE_INVITES_SUCCESS,
        invites: invites
    }
}

export function getSourceInvitesError(error){
    return {
        type: constants.GET_SOURCE_INVITES_ERROR,
        error: error
    }
}

export function getTargetInvites(targetAccountId) {
    return {
        type: constants.GET_TARGET_INVITES,
        targetAccountId: targetAccountId
    }
}

export function getTargetInvitesSuccess(invites){
    return {
        type: constants.GET_TARGET_INVITES_SUCCESS,
        invites: invites
    }
}

export function getTargetInvitesError(error){
    return {
        type: constants.GET_TARGET_INVITES_ERROR,
        error:error
    }
}
