import { spawn, call, put, select, takeLatest,take } from 'redux-saga/effects';

import * as kycAPI from "../../api/kycApi";
import * as ActionTypes from "../constants/kycConstants";

import * as agentAPI from "../../api/agentApi";

import {
    createKycSchemaSuccess,
    createKycSchemaError,
    getKycSchemas,
    getKycSchemasSuccess,
    getKycSchemasError,
    createKycSchemaDefinitionSuccess,
    createKycSchemaDefinitionError,
    getKycSchemaDefinitionsError,
    getKycSchemaDefinitionsSuccess,
    getKycSchemaDefinitions,
    createKycSchemaDefinitionOffer,
    createkySchemaDefinitionOfferSuccess,
    createKycSchemaDefinitionOfferError
} from "../actions/kycActions";



function* createKycSchemaSaga(action){
   try {

    // todo link by did?
    // last bit of linkage.
    action.schema.accountId  = action.currentAccount.id;
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

        //todo query by account id or did...
        const getKycSchemasResponse = yield call(kycAPI.GetAllSchemas, action.accountId);
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

function* getAllKycSchemaDefinitionsSaga(action){
    try {
        const getKycSchemasDefinitionsResponse = yield call(kycAPI.GetKycSchemaDefinitions, action.accountId);
        const getKycSchemasDefinitionsResponseData = yield call([getKycSchemasDefinitionsResponse, getKycSchemasDefinitionsResponse.json])
        if(getKycSchemasDefinitionsResponseData){
            yield put(getKycSchemaDefinitionsSuccess(getKycSchemasDefinitionsResponseData));
        } else {
            yield put(getKycSchemaDefinitionsError("Failed to get schemas"));
        }
    } catch(e){
        yield put(getKycSchemaDefinitionsError(e))
    }
}

function* createKycSchemaDefinitionSaga(action){
    try {
        // todo kyc definition to schema mapping
        action.schemaDefinition.accountId = action.currentAccount.id;
        
        const createKycSchemaDefinitionResponse = yield call(kycAPI.PostKycSchemaDefinition, action.schemaDefinition);
        const createKycSchemaDefinitionResponseData = yield call([createKycSchemaDefinitionResponse,createKycSchemaDefinitionResponse.json]);
        if(createKycSchemaDefinitionResponseData){
        
            const createKycSchemaDefinitionLedger = {
                walletId: action.currentAccount.wallets[0].walletId,
                walletCredential: action.currentAccount.wallets[0].walletKey,
                did: action.currentAccount.wallets[0].did,
                json:action.schemaDefinition.schemaJson, //ulimately schema json
                tag: action.schemaDefinition.credDefTag
            };
           
            const createKycSchemaDefinitionLedgerResponse = yield call(agentAPI.CreateCredentialSchemaDefinition, createKycSchemaDefinitionLedger);
            const createKycSchemaDefinitionLedgerResponseData = yield call([createKycSchemaDefinitionLedgerResponse,createKycSchemaDefinitionLedgerResponse.json]);
            if(createKycSchemaDefinitionLedgerResponseData){

                // Update Object 
                let kycSchemaDefinitionUpdate = {
                    ...createKycSchemaDefinitionResponseData,
                    credDefId:createKycSchemaDefinitionLedgerResponseData.credDefId,
                    credDefJson: createKycSchemaDefinitionLedgerResponseData.credDefJson
                };
                const updateKycSchemaDefinitionResponse = yield call(kycAPI.PutSchemaDefinition, kycSchemaDefinitionUpdate);
                const updateKycSchemaDefinitionResponseData = yield call([updateKycSchemaDefinitionResponse, updateKycSchemaDefinitionResponse.json]);
                if(updateKycSchemaDefinitionResponseData){
                    yield put(getKycSchemaDefinitions(action.currentAccount.id));
                    yield put(createKycSchemaDefinitionSuccess());
                } else {
                    yield put(createKycSchemaDefinitionError("Failed to update KYC Schema After Ledger"));
                }
            } else {
                yield put(createKycSchemaDefinitionError("Failed to create KYC Schema Definition On Ledger"));
            }

        } else {
            yield put(createKycSchemaDefinitionError("Failed to create KYC Schema Definition Object"));
        }

    } catch(e){
        yield put(createKycSchemaDefinitionError(e));
    }
}

function* createKycSchemaDefinitionOfferSaga(action){
    try {

        /*
           private String credDefId;
    private String walletId;
    private String walletKey;
    */
        let offer = {
            credDefId: action.offer.credDefId,
            walletId: action.currentAccount.wallets[0].walletId,
            walletKey: action.currentAccount.wallets[0].walletKey,
        };

        const createOfferResponse = yield call(agentAPI.CreateCredentialOffer, offer);
        const createOfferResponseData = yield call([createOfferResponse,createOfferResponse.json]);
        if(createOfferResponseData) {
            // ok we created the offer how do we store it?
            /*
            public long id;

            public CredentialStatus status;

            public Long sourceAccountId;

            public Long targetAccountId;

            public String credDefId;

            public String credDefJson;

            public String credReqMetadataJson;

            public String credOffer;

            public Date created;

            public Date modified;
            */
        let credOffer ={
            id:0,
            status:"Offered",
            
        }



            yield put(createKycSchemaDefinitionOfferSuccess())

        } else {
            yield put(createKycSchemaDefinitionOfferError("Failed to create offer"));
        }

    }catch(e){
        yield put(createKycSchemaDefinitionOfferError(e))
    }
}

function* kycRootSaga() {
    yield takeLatest(ActionTypes.CREATE_KYC_SCHEMA, createKycSchemaSaga); 
    yield takeLatest(ActionTypes.GET_KYC_SCHEMAS, getAllKycSchemasSaga);
    yield takeLatest(ActionTypes.CREATE_KYC_SCHEMA_DEFINITION, createKycSchemaDefinitionSaga);
    yield takeLatest(ActionTypes.GET_KYC_SCHEMA_DEFINITIONS, getAllKycSchemaDefinitionsSaga);
    yield takeLatest(ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_OFFER, createKycSchemaDefinitionOfferSaga);
}

export default kycRootSaga;