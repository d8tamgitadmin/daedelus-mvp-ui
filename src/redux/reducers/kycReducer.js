import * as constants from "../constants/kycConstants";
import initialState from "../initialState";

export default function kycReducer(state=initialState.kycData, action){
    switch(action.type){
        case constants.CREATE_KYC_SCHEMA:
            return {...state, isCreatingSchema:true, schemaErrorMessage:null, schema:null}
        case constants.CREATE_KYC_SCHEMA_SUCCESS:
            return {...state, isCreatingSchema:false, schemaErrorMessage:null, schema:action.schema}
        case constants.CREATE_KYC_SCHEMA_ERROR:
            return {...state, isCreatingSchema:false, schemaErrorMessage:action.error, schema:null}
        case constants.GET_KYC_SCHEMAS:
            return {...state, isFetchingSchemas:true, schemasErrorMessage:null, schemas:[]}
        case constants.GET_KYC_SCHEMAS_SUCCESS:
            return {...state, isFetchingSchemas:false, schemasErrorMessage:null, schemas:action.schemas}
        case constants.GET_KYC_SCHEMAS_ERROR:
            return {...state, isFetchingSchemas:false, schemasErrorMessage:action.error, schemas:[]}
        default:
            return state;
    }
}
