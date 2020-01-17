import { createSelector } from 'reselect';


export const makeSelectAuthData = () => (state) => state.authData;


export const makeSelectCurrentUser = () => createSelector(
    makeSelectAuthData(),
    (substate) => substate.currentUser);

export const makeSelectToken = () => createSelector(
    makeSelectAuthData(),
    (substate) => substate.token);