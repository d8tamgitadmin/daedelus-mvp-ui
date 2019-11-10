import {  Auth } from '@okta/okta-react';

export const config = {
    issuer: 'https://dev-887734.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: '0oa1s0lajyxlbMcwr357'
  }

export function onAuthRequired({ history }) {
    history.push('/');
  }
const auth = new Auth({...config});
  export default auth;
