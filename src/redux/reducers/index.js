import { combineReducers } from "redux"

import { connectRouter } from 'connected-react-router';

import invitationReducer from "./invitationReducer";
import authReducer from "./authReducer";


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    inviteData: invitationReducer,
    authData: authReducer
});

export default rootReducer;
