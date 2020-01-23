import { createSelector } from 'reselect';


export const makeSelectAccountData = () => (state) => state.accountData;


export const makeSelectUserAccounts = () => createSelector(
    makeSelectAccountData(),
    (substate) => substate.userAccounts);

export const makeSelectIsFetchingUserAccounts = () => createSelector(
    makeSelectAccountData(),
    (substate) => substate.isFetchingUserAccounts);

export const makeSelectAccount = () => createSelector(
    makeSelectAccountData(),
    (substate) => substate.account
)

export const makeSelectIsFetchingPublicAccounts = () => createSelector(
    makeSelectAccountData(),
    (substate) => substate.fetchingAccounts
)

export const makeSelectPublicAccountsMessage = () => createSelector(
    makeSelectAccountData(),
    (substate) => substate.accountsMessage
)

export const makeSelectPublicAccounts = () => createSelector(
    makeSelectAccountData(),
    (substate) => substate.accounts
)