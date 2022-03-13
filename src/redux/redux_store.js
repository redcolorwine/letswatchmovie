import { combineReducers, createStore } from "redux";
import mainPageReducer from "./mainPageReducer";

let reducers = combineReducers({
    main: mainPageReducer
})

let store = createStore(reducers);

export default store;