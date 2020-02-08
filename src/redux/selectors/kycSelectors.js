import { createSelector } from 'reselect';


export const makeSelectKycData = () => (state) => state.kycData;


export const makeSelectKycSchema = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schema
);

export const makeSelectIsCreatingKycSchema = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.isCreatingSchema
);

export const makeSelectCreateKycSchemaErrorMessage = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schemaErrorMessage
);

export const makeSelectKycSchemas = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schemas
);

export const makeSelectIsFetchingKycSchemas = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.isFetchingSchemas
);

export const makeSelectGetKycSchemasErrorMessage = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schemasErrorMessage
);

