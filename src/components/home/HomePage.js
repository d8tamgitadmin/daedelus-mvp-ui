import React, { useState, useEffect }  from 'react';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';



const HomePage = (props) => {

    const [state, setState] = useState({
        authenticated:null
    });

    const checkAuthentication = async () =>{
        const auth = await props.auth.isAuthenticated();
        if (auth !== state.authenticated) {
          setState({ authenticated:auth });
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

export default withAuth(HomePage);