import * as ActionTypes from "../constants/kycConstants";

export function createKycSchema(schema, currentAccount){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA,
        schema: schema,
        currentAccount: currentAccount
    }
};

export function createKycSchemaSuccess(schema){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_SUCCESS,
        schema: schema
    }
};

export function createKycSchemaError(error){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_ERROR,
        error:error
    }
};

export function deleteKycSchema(schemaId){
    return {
        type: ActionTypes.DELETE_KYC_SCHEMA,
        schemaId: schemaId
    }
};

export function deleteKycSchemaSuccess(){
    return {
        type: ActionTypes.DELETE_KYC_SCHEMA_SUCCESS
    }
};

export function deleteKycSchemaError(error){
    return {
        type: ActionTypes.DELETE_KYC_SCHEMA_ERROR,
        error: error
    }
}

export function getKycSchemas(accountId) {
    return {
        accountId: accountId,
        type: ActionTypes.GET_KYC_SCHEMAS
    }
};

export function getKycSchemasSuccess(schemas){
    return {
        type: ActionTypes.GET_KYC_SCHEMAS_SUCCESS,
        schemas: schemas
    }
};

export function getKycSchemasError(error){
    return {
        type: ActionTypes.GET_KYC_SCHEMAS_ERROR,
        error: error
    }
};

export function createKycSchemaDefinition(schemaDefinition,currentAccount) {
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_DEFINITION,
        schemaDefinition: schemaDefinition,
        currentAccount: currentAccount
    }
};

export function createKycSchemaDefinitionSuccess(schemaDefinition){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_SUCCESS,
        schemaDefinition: schemaDefinition
    }
};

export function createKycSchemaDefinitionError(error){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_ERROR,
        error:error
    }
};

export function getKycSchemaDefinitions(accountId) {
    return {
        type: ActionTypes.GET_KYC_SCHEMA_DEFINITIONS,
        accountId: accountId
    }
};

export function getKycSchemaDefinitionsSuccess(schemaDefinitions){
    return {
        type: ActionTypes.GET_KYC_SCHEMA_DEFINITIONS_SUCCESS,
        schemaDefinitions: schemaDefinitions
    }
};

export function getKycSchemaDefinitionsError(error){
    return {
        type: ActionTypes.GET_KYC_SCHEMA_DEFINITIONS_ERROR,
        error: error
    }
};

export function createKycSchemaDefinitionOffer(offer,currentAccount){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_OFFER,
        offer: offer,
        currentAccount: currentAccount
    }
}

export function createkySchemaDefinitionOfferSuccess(){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_OFFER_SUCCESS
    }
}

export function createKycSchemaDefinitionOfferError(error){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_OFFER_ERROR,
        error:error
    }
}