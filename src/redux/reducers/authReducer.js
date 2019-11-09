import * as ActionTypes from "../constants/authConstants";
import initialState from "../initialState";

export default function authReducer(state=initialState.authData, action){
    
    switch(action.type){
        case ActionTypes.CREATE_USER_SUCCESS:                  
            return {...state,currentUser: action.currentUser};
        default:
            return state;
    }

}