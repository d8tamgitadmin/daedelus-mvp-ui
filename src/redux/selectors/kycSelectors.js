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

export const makeSelectSchemaDefinition = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schemaDefinition
);

export const makeSelectIsCreatingSchemaDefinition = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.isCreatingSchemaDefinition
);

export const makeSelectSchemaDefinitionErrorMessage = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schemaDefinitionErrorMessage
);

export const makeSelectSchemaDefinitions = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schemaDefinitions
);

export const makeSelectIsFetchingSchemaDefinitions = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.isFetchingSchemaDefinitions
);

export const makeSelectSchemaDefinitionsErrorMessage = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.schemaDefinitionsErrorMessage
);

export const makeSelectOffers = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.offers
)

export const makeSelectIsGettingOffers = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.isGettingOffers
)

export const makeSelectOffersMessage = () => createSelector(
    makeSelectKycData(),
    (substate) => substate.offersMessage
)