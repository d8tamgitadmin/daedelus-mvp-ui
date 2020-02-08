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

export function getKycSchemas() {
    return {
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