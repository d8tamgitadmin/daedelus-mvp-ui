import * as accountStorage from "../storage/accountStorage";


const initialState = {
    invitation:null,
    authData:{
        currentUser: accountStorage.getUserData() || null
    },
    poolData:{
        result:null,
        isworking:false,
        error:null
    } ,
    accountData:{
        account: null,
        userAccounts: null,
        isFetchingUserAccounts: false,
        isWorkingUserAccount: false,
        error: null
    }
}

export default initialState;