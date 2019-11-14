import * as constants from "../constants/poolConstants";
import initialState from "../initialState";

export default function poolReducer(state=initialState.poolData, action){
    switch(action.type){
        case constants.SEED_POOL:
            return {...state, isworking:true, error:null, result:null}
        case constants.SEED_POOL_SUCCESS:
            return {...state, result:action.result, isworking:false}
        case constants.SEED_POOL_ERROR:
            return {...state, error:action.error, isworking:false}
        default:
            return state;
    }

}