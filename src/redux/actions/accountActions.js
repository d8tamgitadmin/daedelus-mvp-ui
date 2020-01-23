
import * as constants from "../constants/accountConstants";


export function getUserAccounts(userId){
    return {
        type: constants.GET_USER_ACCOUNTS,
        userId: userId
    }
}

export function getUserAccountsSuccess(userAccounts){
    return {
        type: constants.GET_USER_ACCOUNTS_SUCCESS,
        userAccounts: userAccounts
    }
}

export function getUserAccountsError(error){
    return {
        type: constants.GET_USER_ACCOUNTS_ERROR,
        error: error
    }
}

export function getAccountDetail(account){
    return {
        type: constants.GET_ACCOUNT_DETAIL,
        account: account
    }
}

export function createAccount(account) {
    return {
        type: constants.CREATE_ACCOUNT,
        account: account
    }
}

export function createAccountSuccess(account){
    return {
        type: constants.CREATE_ACCOUNT_SUCCESS,
        account: account
    }
}

export function createAccountError(error){
    return {
        type: constants.CREATE_ACCOUNT_ERROR,
        error: error
    }
}

export function getPublicAccounts(){
    return {
        type: constants.GET_PUBLIC_ACCOUNTS
    }
}

export function getPublicAccountsSuccess(accounts){
    return {
        type: constants.GET_PUBLIC_ACCOUNTS_SUCCESS,
        accounts: accounts
    }
}

export function getPublicAccountsError(error){
    return {
        type: constants.GET_PUBLIC_ACCOUNTS_ERROR,
        error: error
    }
}

export function setCurretAccount(account){
    return {
        type: constants.SET_CURRENT_ACCOUNT,
        account: account
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