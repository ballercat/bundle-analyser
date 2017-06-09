import { render } from 'react-dom';
import React from 'react';
import App from './components/App';
import {define, importScript} from './amd';
import appConfig from '../defaults';
import appReducers from './reducers/app-reducers';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

window.Immutable = Immutable;

const rootEl = document.querySelector('#app');

if (!('define' in window)) {
  window.define = define;
}

let reduxCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(appReducers),
  reduxCompose(
    applyMiddleware(thunk)
  )
);
const ConnectedApp = connect(
  state => ({...state})
)(App);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  rootEl
);
