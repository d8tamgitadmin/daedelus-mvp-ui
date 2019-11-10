import {
    AUTH_HEADERS,
    POST_USERDATA

} from "./constants";

import oktaAuth from "../okta";

  

export async function PostUserData(currentUser) {
    let token = await oktaAuth.getAccessToken();
   return fetch(POST_USERDATA.route, {
        method: POST_USERDATA.method,
        withCredentials: true,
        mode: 'cors',
        credentials: 'include',
        headers: AUTH_HEADERS(token),
        body: JSON.stringify(currentUser)
      })
}