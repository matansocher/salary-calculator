import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import Async from './actions/async';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root'));
