import {
    AUTH_HEADERS,
    API_SERVER
} from "./constants";
import oktaAuth from "../okta";


export const GET_USER_ACCOUNTS = {
    'method': 'GET',
    'route':(userId) =>  `${API_SERVER}/api/v1/account/user/${userId}`
  };

  export const DELETE_ACCOUNT = {
    'method': 'DELETE',
    'route':(id) =>  `${API_SERVER}/api/v1/account/${id}`
  };

export const GET_PUBLIC_ACCOUNTS = {
    'method': 'GET',
    'route': `${API_SERVER}/api/v1/account/`
}

export const POST_USER_ACCOUNTS = {
    'method': 'POST',
    'route': `${API_SERVER}/api/v1/account/`
}



export async function GetUserAccounts(userId) {
    let token = await oktaAuth.getAccessToken();

   return fetch(GET_USER_ACCOUNTS.route(userId), {
        method: GET_USER_ACCOUNTS.method,
        withCredentials: true,
        mode: 'cors',
        credentials: 'include',
        headers: AUTH_HEADERS(token)
      })
}

export async function CreateUserAccounts(account){
    let token = await oktaAuth.getAccessToken();
    
    return fetch(POST_USER_ACCOUNTS.route, {
        method: POST_USER_ACCOUNTS.method,
        withCredentials: true,
        mode:'cors',
        credentials:'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(account)
    });
}

export async function GetPublicAccounts(){
    let token = await oktaAuth.getAccessToken();

   return fetch(GET_PUBLIC_ACCOUNTS.route, {
        method: GET_PUBLIC_ACCOUNTS.method,
        withCredentials: true,
        mode: 'cors',
        credentials: 'include',
        headers: AUTH_HEADERS(token)
      })
}

export async function DeleteAccount(id){
    let token = await oktaAuth.getAccessToken();

    return fetch(DELETE_ACCOUNT.route(id), {
        method: DELETE_ACCOUNT.method,
        withCredentials: true,
        mode: 'cors',
        credentials: 'include',
        headers: AUTH_HEADERS(token)
    });
}

