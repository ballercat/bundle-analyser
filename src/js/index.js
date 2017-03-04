import { render } from 'react-dom';
import React from 'react';
import App from './components/App';
import {define, importScript} from './amd';
import appConfig from '../defaults';
import appReducers from './reducers/app-reducers';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { compose,
  tap
} from 'ramda';

const rootEl = document.querySelector('#app');

if (!('define' in window)) {
  window.define = define;
}

const store = createStore(
  appReducers(appConfig),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const ConnectedApp = connect(
  state => ({
    pick_source: state.get('pick_source'),
    search_module: state.get('search_module'),
    progress: state.get('progress')
  })
)(App);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  rootEl
);

