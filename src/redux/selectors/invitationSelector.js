import { createSelector } from 'reselect';


export const makeSelectInviteData = () => (state) => state.inviteData;

export const makeSelectInvitation = () => createSelector(
    makeSelectInviteData(),
    (substate) => substate.invitation
);

export const makeSelectSourceInvitations = () => createSelector(
    makeSelectInviteData(),
    (substate) => substate.sourceInvites
);

export const makeSelectIsFetchingSourceInvitations = () => createSelector(
    makeSelectInviteData(),
    (substate) => substate.isFetchingSourceInvites
);

export const makeSelectSourceInvitationsErrorMessages = () => createSelector(
    makeSelectInviteData(),
    (substate) => substate.sourceInvitesErrorMessage
);

export const makeSelectTargetInvitations = () => createSelector(
    makeSelectInviteData(),
    (substate) => substate.targetInvites
);

export const makeSelectIsFetchingTargetInvitations = () => createSelector(
    makeSelectInviteData(),
    (substate) => substate.isFetchingTargetInvites
);

export const makeSelectTargetInvitationsErrorMessages = () => createSelector(
    makeSelectInviteData(),
    (substate) => substate.targetInvitesErrorMessage
);