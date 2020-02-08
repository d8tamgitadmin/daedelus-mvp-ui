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

export function createAccountLink(currentAccount, targetAccount){
    return {
        type:constants.CREATE_ACCOUNT_LINK,
        currentAccount: currentAccount,
        targetAccount: targetAccount
    }
}

export function createAccountLinkSuccess(invite){
    return {
        type: constants.CREATE_ACCOUNT_LINK_SUCCESS,
        invite: invite
    }
};

export function createAccountLinkError(error){
    return {
        type: constants.CREATE_ACCOUNT_LINK_ERROR,
        error: error
    }
}

export function rejectInvite(invitationId, accountId){
    return {
        type: constants.REJECT_ACCOUNT_LINK,
        invitationId: invitationId,
        accountId: accountId
    }
};

export function rejectInviteSuccess(){
    return {
        type: constants.REJECT_ACCOUNT_LINK_SUCCESS,
    }
}

export function rejectInviteError(error){
    return {
        type: constants.REJECT_ACCOUNT_LINK_ERROR,
        error: error
    }
};

export function acceptInvite(invitation, account) {
    return {
        type: constants.ACCEPT_ACCOUNT_LINK,
        invitation: invitation,
        account: account
    }
};

export function acceptInviteSuccess(){
    return {
        type: constants.ACCEPT_ACCOUNT_LINK_SUCCESS
    }
}

export function acceptInviteError(error){
    return {
        type: constants.ACCEPT_ACCOUNT_LINK_ERROR,
        error:error
    }
}

export function getAccountLinks(accountId){
    return {
        type: constants.GET_ACCOUNT_LINKS,
        accountId: accountId
    }
};

export function getAccountLinksSuccess(accountLinks){
    return {
        type: constants.GET_ACCOUNT_LINKS_SUCCESS,
        accountLinks: accountLinks
    }
};

export function getAccountLinksError(error){
    return {
        type: constants.GET_ACCOUNT_LINKS_ERROR,
        error:error
    }
}
