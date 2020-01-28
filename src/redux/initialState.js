import * as accountStorage from "../storage/accountStorage";


const initialState = {
    inviteData:{
        invitation:null,
        isFetchingSourceInvites: false,
        isFetchingTargetInvites: false,
        sourceInvitesErrorMessage: null,
        targetInvitesErrorMessage: null,
        sourceInvites:[],
        targetInvites:[]
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
   
}

export default initialState;