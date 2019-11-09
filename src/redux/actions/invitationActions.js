import * as constants from "../constants/invitationConstants";

export function createInvitation(invitation){
    return {
        type: constants.CREATE_INVITATION,
        invitation: invitation
    }
}

export function createInivitation(invitation){
    return {
        type: constants.CREATE_INVITATION_SUCCESS,
        invitation: invitation
    }
}
