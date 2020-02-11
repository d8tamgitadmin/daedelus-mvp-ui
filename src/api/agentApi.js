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

export const POST_CREATE_CREDENTIAL_SCHEMA_DEFINITION = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/agent/credentials/schemadefinition`
}

export const POST_CREATE_CREDENTIAL_OFFER = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/agent/credentials/offer`
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

export const POST_LINK_REQUEST = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/agent/link/request`
};

export const POST_LINK_RESPONSE = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/agent/link/response`
}

export async function CreateRelationshipRequest(request) {
    let token = await oktaAuth.getAccessToken();

    return fetch(POST_LINK_REQUEST.route, {
        method: POST_LINK_REQUEST.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(request)
    });
}

export async function CreateLinkResponse(response){
    let token = await oktaAuth.getAccessToken();

    return fetch(POST_LINK_RESPONSE.route, {
        method: POST_LINK_RESPONSE.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(response)
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

export async function CreateCredentialSchemaDefinition(schemaDefinition){
    let token = await oktaAuth.getAccessToken();

    return fetch(POST_CREATE_CREDENTIAL_SCHEMA_DEFINITION.route, {
        method: POST_CREATE_CREDENTIAL_SCHEMA_DEFINITION.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(schemaDefinition)
    });
}


export async function CreateCredentialOffer(offer){
    let token = await oktaAuth.getAccessToken();

    return fetch(POST_CREATE_CREDENTIAL_OFFER.route, {
        method: POST_CREATE_CREDENTIAL_OFFER.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(offer)
    });
}



