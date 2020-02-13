export function createKycSchemaDefinitionOffer(offer,targetAccount,currentAccount){
    return {
        type: ActionTypes.CREATE_KYC_SCHEMA_DEFINITION_OFFER,
        offer: offer,
        currentAccount: currentAccount,
        targetAccount: targetAccount
    }
}

export function createKycSchemaDefinitionOfferSuccess(){
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