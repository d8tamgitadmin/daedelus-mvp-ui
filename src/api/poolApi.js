import {
    AUTH_HEADERS,
    API_SERVER
} from "./constants";

import oktaAuth from "../okta";


export const GET_SEED_POOL = {
    'method': 'GET',
    'route': `${API_SERVER}/api/v1/ledger/seed`
  };

export async function GetPoolSeed() {
    let token = await oktaAuth.getAccessToken();
   return fetch(GET_SEED_POOL.route, {
        method: GET_SEED_POOL.method,
        withCredentials: true,
        mode: 'cors',
        credentials: 'include',
        headers: AUTH_HEADERS(token)
      })
}