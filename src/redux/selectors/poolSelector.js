import { createSelector } from 'reselect';


export const makeSelectPoolData = () => (state) => state.poolData;


export const makeSelectPoolResult = () => createSelector(
    makeSelectPoolData(),
    (substate) => substate.result);

export const makeSelectPoolError = () => createSelector(
    makeSelectPoolData(),
    (substate) => substate.error);


export const makeSelectIsWorking = () => createSelector(
    makeSelectPoolData(),
    (substate) => substate.isworking);
