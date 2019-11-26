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