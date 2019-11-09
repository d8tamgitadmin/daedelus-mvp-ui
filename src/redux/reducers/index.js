import { combineReducers } from "redux"

import invitationReducer from "./invitationReducer";
import authReducer from "./authReducer";


const rootReducer = combineReducers({
    inviteData: invitationReducer,
    authData: authReducer
});

export default rootReducer;
