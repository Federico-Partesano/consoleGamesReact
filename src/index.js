import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
//import List from './FunctionAddList';
//import Game from './Game';
import { createStore, applyMiddleware, compose } from "redux";
import reportWebVitals from "./reportWebVitals";
// Provider permette di connettere lo store ai componenti
import rootReducer from "./reducer";
import { Provider } from "react-redux";

import thunk from "redux-thunk";

// serve ad unire applyMiddleware ad windos. reduxdevtool...
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const dispatch = useDispatch();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// con store specifichiamo che store usare
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
//  <App />
//  <List />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
