import * as ActionTypes from "../constants/poolConstants";


export function seedPool(){
    return {
        type: ActionTypes.SEED_POOL
    }
}

export function seedPoolSuccess(result){
    return {
        type: ActionTypes.SEED_POOL_SUCCESS,
        result:result
    }
}

export function seedPoolError(error){
    return {
        type: ActionTypes.SEED_POOL_ERROR,
        error:error
    }
}