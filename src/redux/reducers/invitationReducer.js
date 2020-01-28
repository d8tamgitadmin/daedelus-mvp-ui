import * as constants from "../constants/invitationConstants";
import initialState from "../initialState";

export default function invitationReducer(state=initialState.inviteData, action){
    switch(action.type){
        case constants.CREATE_INVITATION:
            return [...state, {...action.invitation}]
        
        case constants.GET_SOURCE_INVITES:
            return [...state, {isFetchingSourceInvites: true,sourceInvites:[],sourceInvitesErrorMessage: null}]
        case constants.GET_SOURCE_INVITES_SUCCESS:
            return [...state, {isFetchingSourceInvites: false,sourceInvites:action.invites,sourceInvitesErrorMessage: null}]
        case constants.GET_SOURCE_INVITES_ERROR:
            return [...state, {isFetchingSourceInvites: false,sourceInvites:[],sourceInvitesErrorMessage: action.error}]
        
        case constants.GET_TARGET_INVITES:
            return [...state, {isFetchingTargetInvites: true,targetInvites:[],targetInvitesErrorMessage: null}]
        case constants.GET_TARGET_INVITES_SUCCESS:
            return [...state, {isFetchingTargetInvites: false,targetInvites:action.invites,targetInvitesErrorMessage: null}]
        case constants.GET_TARGET_INVITES_ERROR:
            return [...state, {isFetchingTargetInvites: false,targetInvites:[],targetInvitesErrorMessage: action.error}]


        default:
            return state;
    }

}