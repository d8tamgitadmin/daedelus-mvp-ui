import * as constants from "../constants/accountConstants";
import initialState from "../initialState";
import * as accountStorage from "../../storage/accountStorage";


export default function invitationReducer(state=initialState.accountData, action){
    switch(action.type){
        case constants.GET_USER_ACCOUNTS:            
            return {...state, userAccounts:[], isFetchingUserAccounts:true}        
        case constants.GET_USER_ACCOUNTS_SUCCESS:
            return {...state, userAccounts:action.userAccounts, isFetchingUserAccounts:false}        
        case constants.GET_USER_ACCOUNTS_ERROR:
        
            return {...state, userAccounts:[], isFetchingUserAccounts:false, error:action.error}  
        
        case constants.SET_CURRENT_ACCOUNT:
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

        case constants.GET_PUBLIC_ACCOUNTS:
            return {...state, fetchingAccounts: true, accounts:[], accountsMessage: null};
        case constants.GET_PUBLIC_ACCOUNTS_SUCCESS:
            return {...state, fetchingAccounts: false, accounts: action.accounts, accountsMessage: null};
        case constants.GET_PUBLIC_ACCOUNTS_ERROR:
            return {...state, fetchingAccounts: false, accounts: [], accountsMessage: action.error}

        case constants.CREATE_ACCOUNT_LINK:
            return {...state};
        case constants.CREATE_ACCOUNT_LINK_SUCCESS:
            return {...state};
        case constants.CREATE_ACCOUNT_ERROR:
            return {...state};

        case constants.DELETE_ACCOUNT:
            return {...state}
        case constants.DELETE_ACCOUNT_SUCCESS:
            accountStorage.setAccount(null);
            return {...state, account: null}
        case constants.DELETE_ACCOUNT_ERROR:
            return {...state}

        default:
            return state;
    }

}