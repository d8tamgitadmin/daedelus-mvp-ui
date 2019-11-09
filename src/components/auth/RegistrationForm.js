import React, { useState, useEffect }  from 'react';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

const config = {
    issuer: 'https://dev-887734.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: '0oa1s0lajyxlbMcwr357',
    pkce: true
  }

const RegistrationForm = (props) => {

    const[state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null
    });

    useEffect(() => {
        setState(state);
    },[state])

    const oktaAuth = new OktaAuth({ url: config.issuer });

    const checkAuthentication = async () => {
        const sessionToken = await props.auth.getIdToken();
        if (sessionToken) {
          setState({...state,sessionToken});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await 
        fetch('/api/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        });

        const result = await oktaAuth
        .signIn({
          username: state.email,
          password: state.password
        });
        
        setState({...state, sessionToken: result.sessionToken});           
    }

    const handleFirstNameChange = (e) => {
        this.setState({...state, firstName: e.target.value });
    }
    
    const handleLastNameChange = (e) => {
        this.setState({ ...state, lastName: e.target.value });
      }
     
    const handleEmailChange = (e) => {
        this.setState({ ...state, email: e.target.value });
      }
    
    const handlePasswordChange = (e) => {
        this.setState({...state, password: e.target.value });
      }

    return (
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              value={state.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-element">
            <label>First Name:</label>
            <input
              type="text"
              id="firstName"
              value={state.firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="form-element">
            <label>Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={state.lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="form-element">
            <label>Password:</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={handlePasswordChange}
            />
          </div>
          <input type="submit" id="submit" value="Register" />
        </form>
      );
}

export default withAuth(RegistrationForm);