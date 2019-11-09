import React, { useState, useEffect }  from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { withAuth } from '@okta/okta-react';


const LoginPage = (props) => {
    const [authenticated, setAuthenticated] = useState(null);

    const checkAuthentication = async ()  =>{
        const current = await props.auth.isAuthenticated();
        if (current !== authenticated) {
            setAuthenticated(current);
        }
    }

    useEffect(() => {
        async function f(){
            await checkAuthentication();
        }       
        f();
    },[authenticated]);

    return authenticated && authenticated === true  ? <Redirect to={{ pathname: '/ledger' }} /> : <LoginForm baseUrl={props.baseUrl} />
}

export default withAuth(LoginPage);