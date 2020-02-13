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

        case constants.CREATE_KYC_SCHEMA_DEFINITION:
            return {...state, isCreatingSchemaDefinition:true, schemaDefinitionErrorMessage:null, schemaDefinition:null}
        case constants.CREATE_KYC_SCHEMA_DEFINITION_SUCCESS:
            return {...state, isCreatingSchemaDefinition:false, schemaDefinitionErrorMessage:null, schemaDefinition:action.schemaDefinition}
        case constants.CREATE_KYC_SCHEMA_DEFINITION_ERROR:
            return {...state, isCreatingSchemaDefinition:false, schemaDefinitionErrorMessage:action.error, schemaDefinition:null}
        
        case constants.GET_KYC_SCHEMA_DEFINITIONS:
            return {...state, isFetchingSchemaDefinitions:true, schemaDefinitionsErrorMessage:null, schemaDefinitions:[]}
        case constants.GET_KYC_SCHEMA_DEFINITIONS_SUCCESS:
            return {...state, isFetchingSchemaDefinitions:false, schemaDefinitionsErrorMessage:null, schemaDefinitions:action.schemaDefinitions}
        case constants.GET_KYC_SCHEMA_DEFINITIONS_ERROR:
            return {...state, isFetchingSchemaDefinitions:false, schemaDefinitionsErrorMessage:action.error, schemaDefinitions:[]}

        //todo cred
        case constants.GET_KYC_CREDENTIALS_OFFERS:
            return {...state, isGettingOffers:true, offersMessage:null, offers:[]}
        case constants.GET_KYC_CREDENTIALS_OFFERS_SUCCESS:
            return {...state, isGettingOffers: false, offersMessage:null, offers:action.offers}
        case constants.GET_KYC_CREDENTIALS_OFFERS_ERROR:
            return {...state, isGettingOffers: false, offersMessage: action.error, offers:[]}

        default:
            return state;
    }
}
