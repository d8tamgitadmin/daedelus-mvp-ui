import * as constants from "../constants/invitationConstants";

export default function invitationReducer(state=[], action){
    switch(action.type){
        case constants.CREATE_INVITATION:
            return [...state, {...action.invitation}]
        default:
            return state;
    }

}