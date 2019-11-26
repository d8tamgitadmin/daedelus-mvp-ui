import * as constants from "../constants/accountConstants";
import initialState from "../initialState";


export default function invitationReducer(state=initialState.accountData, action){
    switch(action.type){
        case constants.GET_USER_ACCOUNTS:
            return {...state, userAccounts:null, isFetchingUserAccounts:true}        
        case constants.GET_USER_ACCOUNTS_SUCCESS:
            return {...state, userAccounts:action.userAccounts, isFetchingUserAccounts:false}        
        case constants.GET_USER_ACCOUNTS_ERROR:
            return {...state, userAccounts:null, isFetchingUserAccounts:false, error:action.error}  
        default:
            return state;
    }

}