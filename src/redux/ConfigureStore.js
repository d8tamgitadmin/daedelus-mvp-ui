import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'connected-react-router'

import rootReducer from "./reducers";

import history from "../history";

// Sagas
import authSaga from "./sagas/userDataSaga";

import reduxImmutableStateInvariant from "redux-immutable-state-invariant";


export default function configureStore(initialState) {
    const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [routerMiddleware(history),sagaMiddleware, reduxImmutableStateInvariant()];

    const store = createStore(
        rootReducer(history), 
        initialState,
        composeEnhancers(
            applyMiddleware(
                ...middleWares
                )));

   // then run the saga
   sagaMiddleware.run(authSaga);
                
   
    return store;
}