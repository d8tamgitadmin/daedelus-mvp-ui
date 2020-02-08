import {
    AUTH_HEADERS,
    API_SERVER
} from "./constants";
import oktaAuth from "../okta";


export const POST_CREATE_WALLET = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/agent/account/onboard`
}

export const POST_CREATE_CREDENTIAL_SCHEMA = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/agent/credentials/schema`
}

export async function CreateUserWallet(wallet){
    let token = await oktaAuth.getAccessToken();

    return fetch(POST_CREATE_WALLET.route, {
        method: POST_CREATE_WALLET.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(wallet)
    });
}

export const POST_RELATIONSHIP_REQUEST = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/agent/invitations/request`
}

export async function CreateRelationshipRequest(request) {
    let token = await oktaAuth.getAccessToken();

    return fetch(POST_RELATIONSHIP_REQUEST.route, {
        method: POST_RELATIONSHIP_REQUEST.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(request)
    });
}

export async function CreateCredentialSchema(model) {
    let token = await oktaAuth.getAccessToken();

    return fetch(POST_CREATE_CREDENTIAL_SCHEMA.route, {
        method: POST_CREATE_CREDENTIAL_SCHEMA.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(model)
    });
}



