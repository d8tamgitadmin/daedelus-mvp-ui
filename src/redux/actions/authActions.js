
import * as AuthConstants from "../constants/authConstants";

export function createUserSuccess(currentUser){
    return {
        type: AuthConstants.CREATE_USER_SUCCESS,
        currentUser:currentUser
    }
}