import React, { useState, useEffect } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider as ReduxProvider } from "react-redux";

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch} from "react-router-dom";

import { Security, ImplicitCallback, SecureRoute } from '@okta/okta-react';
import auth, {onAuthRequired} from  "./okta"

import * as serviceWorker from './serviceWorker';

import initialState from "./redux/initialState";
import configureStore from "./redux/ConfigureStore";
import history from "./history"

import Create from "./components/create";
import Ledger from "./components/ledger/LedgerPage"
import MenuAppBar from "./components/appbar";
import About from "./components/about";
import LoginPage from "./components/auth/LoginPage";
import RegistrationForm from "./components/auth/RegistrationForm";
import NotFoundPage from "./components/home/404Page";
import HomePage from "./components/home/HomePage";
import ProfilePage from "./components/profile/ProfilePage.js";
import AccountsPage from "./components/accounts/AccountsPage.js";
import './App.css';
import InvitePage from './components/invites/InvitePage';
import CredentialsPage from './components/creds/CredentialsPage';
import AccountDetailPage from './components/accounts/AccountDetailPage';
import SearchPage from './components/search/SearchPage';
import UserPage from "./components/users/UserPage";


export default function App() {
  return (
    <div className="App">
  <ReduxProvider store={configureStore(initialState)}>
    <ConnectedRouter history={history}>     
      <Security auth={auth} onAuthRequired={onAuthRequired}>
              <Switch>
              <Route path="/" exact component={LoginPage}/>  
                  <MenuAppBar>
                    <Route path ="/register" component={RegistrationForm}/>
                    <SecureRoute path="/home" exact={true} component={HomePage}/>
                    <SecureRoute path="/invites" exact={true} component={InvitePage}/>
                    <SecureRoute path="/accounts" exact={true} component={AccountsPage}/>
                    <SecureRoute path="/accounts/detail/:id"  component={AccountDetailPage}/>
                    <SecureRoute path="/credentials" exact={true} component={CredentialsPage}/>
                    <SecureRoute path="/create" exact={true} component={Create}/>
                    <SecureRoute path="/ledger" exact={true} component={Ledger}/>
                    <SecureRoute path="/about" exact={true} component={About}/>
                    <SecureRoute path="/profile" exact={true} component={ProfilePage}/>
                    <SecureRoute path="/members" exact={true} component={SearchPage}/>
                    <SecureRoute path="/users" exact={true} component={UserPage}/>
                    <Route path='/implicit/callback' component={ImplicitCallback}/>
                  </MenuAppBar>  
                  <SecureRoute component={NotFoundPage}/>         
              </Switch>       
        </Security>
      </ConnectedRouter>
    </ReduxProvider>
  </div>
  );
}

serviceWorker.unregister();