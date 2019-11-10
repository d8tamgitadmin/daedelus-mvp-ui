
import * as AuthConstants from "../constants/authConstants";

export function oktaLoginSuccess(currentUser){
    return {
        type: AuthConstants.OKTA_LOGIN_SUCCESS,
        currentUser:currentUser
    }
}

export function getUserDataSuccess(userData, token){
    return {
        type: AuthConstants.GET_USERDATA_SUCCESS,
        userData: userData,
        token: token
    }
}

export function getUserDataError(error){
    return {
        type: AuthConstants.GET_USERDATA_ERROR,
        error:error
    }
}