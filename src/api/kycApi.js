import {
    AUTH_HEADERS,
    API_SERVER
} from "./constants";
import oktaAuth from "../okta";


export const POST_SCHEMA = {
    'method': 'POST',
    'route': `${API_SERVER}/api/v1/kyc/schmea`
}

export const GET_ALL_SCHEMAS = {
    'method': 'GET',
    'route':  `${API_SERVER}/api/v1/kyc/schmea`
}

export const PUT_SCHEMA = {
    'method': 'PUT',
    'route': `${API_SERVER}/api/v1/kyc/schmea`
}

export async function CreateSchema(schema){
    let token = await oktaAuth.getAccessToken();
    
    return fetch(POST_SCHEMA.route, {
        method: POST_SCHEMA.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(schema)
    });
};

export async function GetAllSchemas() {
    let token = await oktaAuth.getAccessToken();

   return fetch(GET_ALL_SCHEMAS.route, {
        method: GET_ALL_SCHEMAS.method,
        withCredentials: true,
        mode: 'cors',
        credentials: 'include',
        headers: AUTH_HEADERS(token)
      })
};

export async function PutSchema(schema) {
    let token = await oktaAuth.getAccessToken();

   return fetch(PUT_SCHEMA.route, {
        method: PUT_SCHEMA.method,
        withCredentials: true,
        mode: 'cors',
        credentials: 'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(schema)
      })
};

