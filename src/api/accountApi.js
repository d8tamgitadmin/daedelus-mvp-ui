import {
    AUTH_HEADERS,
    API_SERVER
} from "./constants";
import oktaAuth from "../okta";


export const GET_USER_ACCOUNTS = {
    'method': 'GET',
    'route':(userId) =>  `${API_SERVER}/api/v1/account/user/${userId}`
  };

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