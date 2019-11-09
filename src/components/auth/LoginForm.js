import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from "react-router";
import { withRouter } from 'react-router-dom';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';


const LoginForm = (props) => {

    const [sessionToken, setSessionToken] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const oktaAuth = new OktaAuth({ url: "https://dev-887734.okta.com" });

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);       
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

   const handleSubmit = (e) => {
        e.preventDefault();
       
        oktaAuth
        .signIn({
          username: username,
          password: password
        })
        .then(res => {
            setSessionToken(res.sessionToken);
            props.auth.redirect({sessionToken: sessionToken})
        }
          
        )
        .catch(err => {
            setError(err.message);
          console.log(err.statusCode + ' error', err);
        });
    }

    

      const errorMessage = error ? (
        <span className="error-message">{error}</span>
      ) : null;

      return (
        <div>
          {
              sessionToken ? 
              props.auth.redirect({sessionToken: sessionToken}) :
              <form onSubmit={handleSubmit}>
              {errorMessage}
              <div className="form-element">
                <label>Username:</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
    
              <div className="form-element">
                <label>Password:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <input id="submit" type="submit" value="Submit" />
            </form>
          }
         </div>
      );
}

LoginForm.propTypes = {
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
}

export default compose(
    withAuth,
    withRouter
)(LoginForm);