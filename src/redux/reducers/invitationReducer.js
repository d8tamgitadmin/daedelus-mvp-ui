import * as constants from "../constants/invitationConstants";
import initialState from "../initialState";

export default function invitationReducer(state=initialState.inviteData, action){
    switch(action.type){
        case constants.CREATE_INVITATION:
            return {...state, invitiation: action.invitation}
        
        case constants.GET_SOURCE_INVITES:
           return {...state, isFetchingSourceInvites: true,sourceInvites:[],sourceInvitesErrorMessage: null}
        case constants.GET_SOURCE_INVITES_SUCCESS:       
            return {...state, isFetchingSourceInvites: false,sourceInvites:action.invites,sourceInvitesErrorMessage: null}
        case constants.GET_SOURCE_INVITES_ERROR:
            return {...state, isFetchingSourceInvites: false,sourceInvites:[],sourceInvitesErrorMessage: action.error}
        
        case constants.GET_TARGET_INVITES:
            return {...state, isFetchingTargetInvites: true,targetInvites:[],targetInvitesErrorMessage: null}
        case constants.GET_TARGET_INVITES_SUCCESS:    
            return {...state, isFetchingTargetInvites: false,targetInvites:action.invites,targetInvitesErrorMessage: null}
        case constants.GET_TARGET_INVITES_ERROR:
            return {...state, isFetchingTargetInvites: false,targetInvites:[],targetInvitesErrorMessage: action.error}
        
        case constants.CREATE_ACCOUNT_LINK:
            return {...state};
        case constants.CREATE_ACCOUNT_LINK_SUCCESS:
            return {...state};
        case constants.CREATE_ACCOUNT_LINK_ERROR:
            return {...state};
        case constants.REJECT_ACCOUNT_LINK:
            return {...state, isFetchingSourceInvites: true, isFetchingTargetInvites:true}
        case constants.REJECT_ACCOUNT_LINK_ERROR:
        case constants.REJECT_ACCOUNT_LINK_SUCCESS:
            return {...state, isFetchingSourceInvites: false, isFetchingTargetInvites:false}

        case constants.GET_ACCOUNT_LINKS:
            return {...state, isFetchingAccountLinks: true, accountLinks:[],accountLinksErrorMessage:null}
        case constants.GET_ACCOUNT_LINKS_SUCCESS:
            return {...state, isFetchingAccountLinks: false, accountLinks:action.accountLinks,accountLinksErrorMessage:null}
        case constants.GET_ACCOUNT_LINKS_ERROR:
            return {...state, isFetchingAccountLinks: false, accountLinks:[],accountLinksErrorMessage:action.error}

        default:
            return state;
    }

}