
import * as AuthConstants from "../constants/authConstants";


export function oktaLoginReplay(){
    return {
        type: AuthConstants.OKTA_LOGIN_REPLAY
    }
}

export function oktaLogin(username,password){
    return {
        type: AuthConstants.OKTA_LOGIN,
        username:username,
        password:password
    }
}

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