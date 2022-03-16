import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/redux_store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

/*  axios для запросов API,
    react-redux для удобной работы с redux,
    react-router-dom для навигации NavLink,
    redux state-management ,
    redux-thunk для использование thunk middleware */