import {
    AUTH_HEADERS,
    API_SERVER
} from "./constants";
import oktaAuth from "../okta";


export const POST_CREATE_INVITE = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/invite`
}

export const GET_SOURCE_INVITES = {
    'method': 'GET',
    route: (sourceTargetId) => `${API_SERVER}/api/v1/invite/source/${sourceTargetId}`
}

export const GET_INVITES_COUNT = {
    'method': 'GET',
    route: (id) => `${API_SERVER}/api/v1/invite/count/${id}`
}

export const GET_TARGET_INVITES = {
    'method': 'GET',
    route: (targetAccountId) => `${API_SERVER}/api/v1/invite/target/${targetAccountId}`
}

export const POST_CREATE_ACCOUNT_LINK = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/link`
}

export const GET_ACCOUNT_LINKS= {
    'method': 'GET',
    route: (accountId) => `${API_SERVER}/api/v1/link/${accountId}`
}

export const DELETE_INVITE = {
    'method': 'DELETE',
    route: (id) => `${API_SERVER}/api/v1/invite/${id}`
}


export async function CreateInvite(invite){
    let token = await oktaAuth.getAccessToken();
    
    return fetch(POST_CREATE_INVITE.route, {
        method: POST_CREATE_INVITE.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(invite)
    });
}

export async function GetSourceInvites(sourceAccountId) {
    let token = await oktaAuth.getAccessToken();

    return fetch(GET_SOURCE_INVITES.route(sourceAccountId), {
        method: GET_SOURCE_INVITES.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token)
    });
}

export async function GetTargetInvites(targetAccountId) {
    let token = await oktaAuth.getAccessToken();
    
    return fetch(GET_TARGET_INVITES.route(targetAccountId), {
        method: GET_TARGET_INVITES.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token)
    });
}

export async function GetInvitesCount(id) {
    let token = await oktaAuth.getAccessToken();

    return fetch(GET_INVITES_COUNT.route(id), {
        method: GET_INVITES_COUNT.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token)
    });
};

export async function GetAccountLinks(accountId){
    let token = await oktaAuth.getAccessToken();

    return fetch(GET_ACCOUNT_LINKS.route(accountId), {
        method: GET_ACCOUNT_LINKS.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token)
    });
}

export async function CreateAccountLink(accountLink){
    let token = await oktaAuth.getAccessToken();
    
    return fetch(POST_CREATE_ACCOUNT_LINK.route, {
        method: POST_CREATE_ACCOUNT_LINK.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(accountLink)
    });
}

export async function DeleteInvite(inviteId) {
    let token = await oktaAuth.getAccessToken();

    return fetch(DELETE_INVITE.route(inviteId), {
        method: DELETE_INVITE.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token)
    });
}