
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