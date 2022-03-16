import { applyMiddleware, combineReducers, createStore } from "redux";
import mainPageReducer from "./mainPageReducer";
import thunk from 'redux-thunk';
/* Инициализируем store
    используем middleware thunk
    для ассинхронных запросов к API 
    из бизнес уровня
*/
let reducers = combineReducers({
    main: mainPageReducer
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;