import React, { Component } from 'react';
import PickSource from './PickSource';
import Progress from './Progress';
import ModuleMap from './ModuleMap';
import { has, map, curry } from 'ramda';

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

  render() {
    return (
      <div className="App">
        <PickSource onSubmit={this.addSource.bind(this)} />
        <Progress loading={this.state.loading} />

        <ModuleMap modules={this.state.modules} />
      </div>
    );
  }
}

