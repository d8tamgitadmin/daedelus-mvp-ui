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

export const GET_TARGET_INVITES = {
    'method': 'GET',
    route: (targetAccountId) => `${API_SERVER}/api/v1/invite/target/${targetAccountId}`
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
    debugger;
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