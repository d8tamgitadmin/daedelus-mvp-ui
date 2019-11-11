import * as ActionTypes from "../constants/authConstants";
import initialState from "../initialState";

export default function authReducer(state=initialState.authData, action){
    
    switch(action.type){
        case ActionTypes.GET_USERDATA_SUCCESS:                              
            return {...state,currentUser: action.userData};
        default:
            return state;
    }

}