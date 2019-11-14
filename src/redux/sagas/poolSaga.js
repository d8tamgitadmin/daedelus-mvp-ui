import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';


import * as poolApi from "../../api/poolApi";
import * as ActionTypes from "../constants/poolConstants";

import {
    seedPoolSuccess,
    seedPoolError
} from "../actions/poolActions";


function* seedPoolSaga(){
    try {      
        const response = yield call(poolApi.GetPoolSeed);        
        const responseData = yield call([response, response.text]);
        if(responseData){
          yield put(seedPoolSuccess(responseData));
        } else {
          yield put(seedPoolError("empty pool seed"));
        }
       
     } catch (e) {
        yield put(seedPoolError(e.message));
     }
}

function* poolRootSaga() {
       yield takeLatest(ActionTypes.SEED_POOL, seedPoolSaga); 
}
   
export default poolRootSaga;