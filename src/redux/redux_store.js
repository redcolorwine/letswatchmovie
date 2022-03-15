import { applyMiddleware, combineReducers, createStore } from "redux";
import mainPageReducer from "./mainPageReducer";
import thunk from 'redux-thunk';
let reducers = combineReducers({
    main: mainPageReducer
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;