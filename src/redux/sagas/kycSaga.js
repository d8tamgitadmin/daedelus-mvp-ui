import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import * as kycAPI from "../../api/kycApi";
import * as ActionTypes from "../constants/kycConstants";

import * as agentAPI from "../../api/agentApi";

import {
    createKycSchemaSuccess,
    createKycSchemaError,
    getKycSchemas,
    getKycSchemasSuccess,
    getKycSchemasError
} from "../actions/kycActions";



function* createKycSchemaSaga(action){
   try {
    const createKycSchemaResponse = yield call(kycAPI.CreateSchema, action.schema);
    const createKycSchemaResponseData = yield call([createKycSchemaResponse, createKycSchemaResponse.json])
    if(createKycSchemaResponseData){
        
        // agentAPI
        let createCredentialSchemaDto = {
            name: createKycSchemaResponseData.name,
            version: createKycSchemaResponseData.version,
            attributes: createKycSchemaResponseData.attributes,
            did: action.currentAccount.wallets[0].did
        };

        const ledgerCreateKycSchemaResponse = yield call(agentAPI.CreateCredentialSchema, createCredentialSchemaDto);
        const ledgerCreateKycSchemaResponseData = yield call([ledgerCreateKycSchemaResponse, ledgerCreateKycSchemaResponse.json]);
        if(ledgerCreateKycSchemaResponseData){

            let schemaUpdate = {
                ...createKycSchemaResponseData,
                schemaId: ledgerCreateKycSchemaResponseData.schemaId,
                json: ledgerCreateKycSchemaResponseData.schemaJson
            }

            const updateKycSchemaResponse = yield call(kycAPI.PutSchema, schemaUpdate);
            const updateKycSchemaResponseResponseData = yield call([updateKycSchemaResponse, updateKycSchemaResponse.json]);
            if(updateKycSchemaResponseResponseData){
                yield put(createKycSchemaSuccess(createKycSchemaResponseData));
                yield put(getKycSchemas());
            } else {
                yield put(createKycSchemaError("Failed to update credential schema"));
            }
        } else {
            yield put(createKycSchemaError("Failed to create credential schema"));
        }
    } else {
        yield put(createKycSchemaError("Failed to create"));
    }
   } catch(e){
       yield put(createKycSchemaError(e));
   }
}

function* getAllKycSchemasSaga(action){
    try {
        const getKycSchemasResponse = yield call(kycAPI.GetAllSchemas);
        const getKycSchemasResponseData = yield call([getKycSchemasResponse, getKycSchemasResponse.json])
        if(getKycSchemasResponseData){
            yield put(getKycSchemasSuccess(getKycSchemasResponseData));
        } else {
            yield put(getKycSchemasError("Failed to get schemas"));
        }

    } catch(e){
        yield put(getKycSchemasError(e));
    }
}




function* kycRootSaga() {
    yield takeLatest(ActionTypes.CREATE_KYC_SCHEMA, createKycSchemaSaga); 
    yield takeLatest(ActionTypes.GET_KYC_SCHEMAS, getAllKycSchemasSaga)
}

export default kycRootSaga;