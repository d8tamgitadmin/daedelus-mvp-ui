import {
    AUTH_HEADERS,
    API_SERVER
} from "./constants";
import oktaAuth from "../okta";


export const POST_CREATE_INVITE = {
    'method': 'POST',
    'route':  `${API_SERVER}/api/v1/invite`
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