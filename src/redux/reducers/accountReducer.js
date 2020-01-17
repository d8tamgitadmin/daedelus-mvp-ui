import * as constants from "../constants/accountConstants";
import initialState from "../initialState";
import * as accountStorage from "../../storage/accountStorage";


export default function invitationReducer(state=initialState.accountData, action){
    switch(action.type){
        case constants.GET_USER_ACCOUNTS:
            accountStorage.setAccount(null);
            return {...state, userAccounts:null, account:null, isFetchingUserAccounts:true}        
        case constants.GET_USER_ACCOUNTS_SUCCESS:
            return {...state, userAccounts:action.userAccounts, isFetchingUserAccounts:false}        
        case constants.GET_USER_ACCOUNTS_ERROR:
            return {...state, userAccounts:null, isFetchingUserAccounts:false, error:action.error}  
        case constants.GET_ACCOUNT_DETAIL:
            accountStorage.setAccount(action.account);
            return {...state, account:action.account}
        case constants.CREATE_ACCOUNT:
            accountStorage.setAccount(null);
            return { ...state, account:null,isFetchingUserAccounts:true}
        case constants.CREATE_ACCOUNT_SUCCESS:
            accountStorage.setAccount(action.account);
            return {...state, account: action.account, isFetchingUserAccounts: false}
        case constants.CREATE_ACCOUNT_ERROR:
            accountStorage.setAccount(null);
            return { ...state, account:null,isFetchingUserAccounts:false}
        default:
            return state;
    }

}