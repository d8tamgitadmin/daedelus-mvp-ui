import React, { useState, useEffect } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';

import * as serviceWorker from './serviceWorker';

import configureStore from "./redux/ConfigureStore";


import Create from "./components/create";
import Ledger from "./components/ledger"
import MenuAppBar from "./components/appbar";
import About from "./components/about";
import LoginPage from "./components/auth/LoginPage";
import RegistrationForm from "./components/auth/RegistrationForm";
import NotFoundPage from "./components/home/404Page";
import HomePage from "./components/home/HomePage";
import './App.css';

function onAuthRequired({ history }) {
  history.push('/');
}

const config = {
  issuer: 'https://dev-887734.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa1s0lajyxlbMcwr357'
}

export default function App() {
  return (
    <div className="App">
  <ReduxProvider store={configureStore()}>
     <Router>
      <Security {...config} onAuthRequired={onAuthRequired}>
      <header >
      <MenuAppBar/>
      </header>
      <main className="App-header">       
          <Switch>
              <Route path="/" exact component={LoginPage}/>              
              <Route path ="/register" component={RegistrationForm}/>
              <SecureRoute path="/home" exact={true} component={HomePage}/>
              <SecureRoute path="/create" exact={true} component={Create}/>
              <SecureRoute path="/ledger" exact={true} component={Ledger}/>
              <SecureRoute path="/about" exact={true} component={About}/>
              <Route path='/implicit/callback' component={ImplicitCallback}/>
              <Route component={NotFoundPage}/>
          </Switch>       
      </main> 
        </Security>
      </Router>
    </ReduxProvider>
  </div>
  );
}

serviceWorker.unregister();