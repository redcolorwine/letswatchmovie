import { applyMiddleware, combineReducers, createStore } from "redux";
// import mainPageReducer from "./mainPageReducer";
import mainPageReducer from "./mainPageReducer";
import tvPageReducer from "./tvPageReducer";
import moviePageReducer from "./moviePageReducer";
import thunk from 'redux-thunk';
/* Инициализируем store
    используем middleware thunk
    для ассинхронных запросов к API 
    из бизнес уровня
*/
let reducers = combineReducers({
    main: mainPageReducer,
    tv: tvPageReducer,
    movie: moviePageReducer
})

let store = createStore(reducers, applyMiddleware(thunk));

export default store;