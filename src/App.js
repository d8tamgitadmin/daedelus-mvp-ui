import React from 'react';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';


import homeReducer from "./components/create/reducer";
import Create from "./components/create";
import Ledger from "./components/ledger"
import MenuAppBar from "./components/appbar";
import LogIn from "./components/login";

import logo from './logo.svg';
import './App.css';






let config = {
  clientId: '0oa1p80pl4rKZfgFQ357',
  issuer: 'https://dev-887734.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/implicit/callback',
  onAuthRequired:{onAuthRequired},
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
const CALLBACK_PATH = '/implicit/callback';



const AboutComponent = () => {
  return ( 
    <div>
       <img src={logo} className="App-logo" alt="logo" />
  <p>
    Welcome Daedalus
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
    </div>
 )
}

function onAuthRequired({history}){
  history.push('/');
}


function App() {
  return (
    <div className="App">
     <Router>
      <Security {...config}>
      <header >
      <MenuAppBar/>
      </header>
      <main className="App-header">       
          <Switch>
              <Route path="/" exact component={LogIn}/>
              <Route path="/login" render={()=> <LogIn/>}/>
              <Route path="/create" exact={true} component={Create}/>
              <Route path="/ledger" exact={true} component={Ledger}/>
              <SecureRoute path="/about" exact={true} component={AboutComponent}/>
              <Route path={"CALLBACK_PATH"} component={ImplicitCallback} />
              <Route component={LogIn}/>
          </Switch>       
      </main> 
        </Security>
      </Router>
    </div>
  );
}

export default App;
