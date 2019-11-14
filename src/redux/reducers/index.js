import { combineReducers } from "redux"

import { connectRouter } from 'connected-react-router';

import invitationReducer from "./invitationReducer";
import authReducer from "./authReducer";
import poolReducer from "./poolReducer";


const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    inviteData: invitationReducer,
    authData: authReducer,
    poolData: poolReducer
});

export default rootReducer;
