import * as accountStorage from "../storage/accountStorage";


const initialState = {
    inviteData:{
        invitation:null,
        isFetchingSourceInvites: false,
        isFetchingTargetInvites: false,
        sourceInvitesErrorMessage: null,
        targetInvitesErrorMessage: null,
        sourceInvites:[],
        targetInvites:[],
        accountLinks:[],
        isFetchingAccountLinks:false,
        accountLinksErrorMessage:null,
        inviteCount: 0,
    },
    authData:{
        currentUser: accountStorage.getUserData() || null
    },
    poolData:{
        result:null,
        isworking:false,
        error:null
    } ,
    accountData:{
        account: accountStorage.getAccount() || null,
        fetchingAccounts: false,
        accountsMessage: null,
        accounts:[],
        userAccounts: null,
        isFetchingUserAccounts: false,
        isWorkingUserAccount: false,
        error: null,
    },
    kycData:{
        schema:null,
        isCreatingSchema:false,       
        schemaErrorMessage:null,
        isFetchingSchemas:false,
        schemasErrorMessage:null,
        schemas:[],

        schemaDefinition:null,
        isCreatingSchemaDefinition:false,
        schemaDefinitionErrorMessage: null,

        schemaDefinitions:[],
        isFetchingSchemaDefinitions:false,
        schemaDefinitionsErrorMessage: null
    },
   
}

export default initialState;