import { createStore } from "redux";
import initialStore from "./initialStore";


export default function homeReducer(state = initialStore, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }