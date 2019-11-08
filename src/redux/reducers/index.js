import { combineReducers } from "redux"

import invitationReducer from "./invitationReducer";


const rootReducer = combineReducers({
    invitationReducer,
});

export default rootReducer;
