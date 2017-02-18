import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import {define, importScript} from './amd';

const rootEl = document.querySelector('#app');

if (!('define' in window)) {
  window.define = define;
}

ReactDOM.render(
  <App importScript={importScript} />,
  rootEl
);

