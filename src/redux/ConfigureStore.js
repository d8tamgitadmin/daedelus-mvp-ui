import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { routerMiddleware } from 'connected-react-router';
import rootReducer from "./reducers";

import history from "../history";

// Sagas
import authSaga from "./sagas/userDataSaga";
import poolSaga from "./sagas/poolSaga";
import accountSaga from "./sagas/accountSaga";
import inviteSaga from "./sagas/inviteSaga";
import kycSaga from "./sagas/kycSaga";

import reduxImmutableStateInvariant from "redux-immutable-state-invariant";


export default function configureStore(initialState) {
    const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [routerMiddleware(history),sagaMiddleware, reduxImmutableStateInvariant()];
    const hotRootReducer =  rootReducer(history);
    const store = createStore(
        hotRootReducer, 
        initialState,
        composeEnhancers(
            applyMiddleware(
                ...middleWares
                )));

    // hot module for dev
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
          module.hot.accept('./reducers', () => {
            store.replaceReducer(hotRootReducer);
          });
        }
      }

   // then run the saga
   sagaMiddleware.run(authSaga);
   sagaMiddleware.run(poolSaga);
   sagaMiddleware.run(accountSaga);
   sagaMiddleware.run(inviteSaga);
   sagaMiddleware.run(kycSaga);
                
   
    return store;
}