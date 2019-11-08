import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import { configureSaga } from "./ConfiigureSaga";

import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

export default function configureStore(initialState) {
    const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const sagaMiddleWare = createSagaMiddleware();
    const middleWares = [sagaMiddleWare, reduxImmutableStateInvariant()];

    const store = createStore(
        rootReducer, 
        initialState,
        composeEnhancers(
            applyMiddleware(
                ...middleWares
                )));

    
    configureSaga(sagaMiddleWare);
    return store;
}