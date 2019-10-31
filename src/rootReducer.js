import { combineReducers, createStore } from 'redux'

import homeReducer from "./components/home/reducer";

const rootReducer = combineReducers({
    homeReducer
});

const reducerInitializedStore = createStore(rootReducer)
// Add the reducer to your store on the `routing` key
