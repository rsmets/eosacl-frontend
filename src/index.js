import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './reducers'

const store = createStore(reducer);

// ReactDOM.render(
//   // <App />,
//   <Home/>,
//   document.getElementById('root')
// );


ReactDOM.render(
  <Provider store={store}><Home/></Provider>,
  document.getElementById('root')
);