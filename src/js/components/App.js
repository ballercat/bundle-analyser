import React, { Component } from 'react';
import PickSource from './PickSource';
import Progress from './Progress';
import Factory from './Factory';
import Module from './Module';
import { has, map } from 'ramda';
import '../../scss/components/ModuleList';

const getModule = Factory(Module);

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
      modules: Object.keys(modules).map((name, index) => (getModule(modules[name]))),
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

        <div className="ModuleList">
          {this.state.modules}
        </div>
      </div>
    );
  }
}

