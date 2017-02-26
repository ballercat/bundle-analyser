import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import Form from './Form';
import Progress from './Progress';
import ModuleMap from './ModuleMap';
import appConfig from '../../defaults';
import {
  has,
  map,
  prop,
  pick,
  curry
} from 'ramda';

const store = createStore(
  (state = appConfig, action) => state
);
const PickSource = connect(prop('pick_source'))(Form);
const ProgressIndicator = connect(pick(['loading']))(Progress);
const SearchModules = connect(prop('search_module'))(Form);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modules: []
    };

    this.setModules = this.setModules.bind(this);
  }

  setModules(modules) {
    this.setState({
      modules: modules,
      loading: false
    });
  }

  addSource(options) {
    if (!this.props.importScript  || !has('source', options)) {
      return;
    }

    this.setState({
      ...options,
      loading: !this.state.loading
    });

    this.props.importScript(options.source).then(this.setModules);
  }

  searchModule(options) {
    this.moduleMap.search(options);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <PickSource />
        </div>
      </Provider>
    );
  }
}

