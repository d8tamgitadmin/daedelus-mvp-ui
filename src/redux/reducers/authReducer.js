import * as ActionTypes from "../constants/authConstants";
import initialState from "../initialState";
import * as accountStorage from "../../storage/accountStorage";

export default function authReducer(state=initialState.authData, action){
    
    switch(action.type){
        case ActionTypes.GET_USERDATA_SUCCESS: 
            accountStorage.setUserData(action.userData);                             
            return {...state,currentUser: action.userData};
        case ActionTypes.RESET_USER_DATA:
            accountStorage.setUserData(null)
            return {...state,currentUser: null};
        default:
            return state;
    }
}