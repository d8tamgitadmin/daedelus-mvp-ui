import React, { useState, useEffect }  from 'react';

import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import * as authActions from "../../redux/actions/authActions";

import * as authSelectors from "../../redux/selectors/authSelector";

const HomePage = (props) => {

    const [state, setState] = useState({
        authenticated:null,
        currentUser:null
    });

    const checkAuthentication = async () =>{
        const auth = await props.auth.isAuthenticated();
        if (auth !== state.authenticated) {
        
          const currentUser = await props.auth.getUser();
          setState({ authenticated:auth,
            currentUser:currentUser
         });
         
         props.actions.oktaLoginSuccess(currentUser);
        }
    }

    useEffect(() => {
        checkAuthentication();
    })

    return(

        <div>
         <h1>Home Page</h1>
            { state.authenticated ?
      <button onClick={() => {props.auth.logout()}}>Logout</button> :
      <button onClick={() => {props.auth.login()}}>Login</button>}
    </div>
    
   );
}

const mapStateToProps = createStructuredSelector({
    currentUser: authSelectors.makeSelectCurrentUser(),
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(authActions, dispatch)
  },
};
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default compose(
    withAuth,
    withRouter,
    withConnect
)(HomePage);