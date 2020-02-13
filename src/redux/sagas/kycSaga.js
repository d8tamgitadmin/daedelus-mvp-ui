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
    createKycSchemaDefinitionOfferSuccess,
    createKycSchemaDefinitionOfferError,
    getKycCredentialOffersSuccess,
    getKycCrednetialOffersError
} from "../actions/kycActions";

const generateDate = () => {
    const today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth()+1).toString(); 
    let yyyy = today.getFullYear().toString();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    return yyyy+"-"+mm+"-"+dd;
};

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
        const {offer,currentAccount,targetAccount } = action;
        
        let model = {
            credDefId: offer.credDefId,
            walletId: currentAccount.wallets[0].walletId,
            walletKey: currentAccount.wallets[0].walletKey,
        };
      
        const createOfferResponse = yield call(agentAPI.CreateCredentialOffer, model);
        const createOfferResponseData = yield call([createOfferResponse,createOfferResponse.json]);
        if(createOfferResponseData) {
         
            let credOfferModel = {
                id:0,
                status:"Offered",    
                sourceAccountId:currentAccount.id,
                targetAccountId: targetAccount.id,  
                credDefId:  offer.credDefId,
                credDefJson:"",
                credReqMetadataJson:"",
                credOffer:createOfferResponseData.credOffer,
                created: generateDate(),
                modified:  generateDate()
            };
           
            const saveOfferResponse = yield call(kycAPI.PostCredentialOffer, credOfferModel);
            const saveofferResponseData = yield call([saveOfferResponse, saveOfferResponse.json]);
            if(saveofferResponseData){
                yield put(createKycSchemaDefinitionOfferSuccess())
            } else {
                yield put(createKycSchemaDefinitionOfferError("Failed to save offer"));
            }
        } else {
            yield put(createKycSchemaDefinitionOfferError("Failed to create offer"));
        }

    }catch(e){
        yield put(createKycSchemaDefinitionOfferError(e))
    }
}

function* getKycCredentialOffersSaga(action){
    try {

        const getCredOffersResponse = yield call(kycAPI.GetCredentialOffers, action.accountId);
        const getCredOffersResponseData = yield call([getCredOffersResponse,getCredOffersResponse.json]);
        if(getCredOffersResponseData){
            yield put(getKycCredentialOffersSuccess(getCredOffersResponseData))
        } else {
            put(getKycCrednetialOffersError("Failed to get kyc cred offers"));
        }

    } catch (ex){
        yield put(getKycCrednetialOffersError(ex))
    }
}

function* kycRootSaga() {
    yield takeLatest(ActionTypes.CREATE_KYC_SCHEMA, createKycSchemaSaga); 
    yield takeLatest(ActionTypes.GET_KYC_SCHEMAS, getAllKycSchemasSaga);
    yield takeLatest(ActionTypes.CREATE_KYC_SCHEMA_DEFINITION, createKycSchemaDefinitionSaga);
    yield takeLatest(ActionTypes.GET_KYC_SCHEMA_DEFINITIONS, getAllKycSchemaDefinitionsSaga);
    yield takeLatest(ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_OFFER, createKycSchemaDefinitionOfferSaga);
    yield takeLatest(ActionTypes.GET_KYC_CREDENTIALS_OFFERS, getKycCredentialOffersSaga)
}

export default kycRootSaga;