import React, { Component } from 'react';
import Form from './Form';
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

  searchModule(options) {
  }

  render() {
    const moduleMap = this.state.modules ?
      <ModuleMap
        modules={this.state.modules}
      /> : null;

    return (
      <div className="App">
        <Form
          onSubmit={this.addSource.bind(this)}
          inputs={
            [
              {
                type: 'group',
                label: 'Pick a Source to analyse',
                inputs: [
                  {
                    type: 'text-input',
                    name: 'source',
                    placeholder: 'Source'
                  },
                  {
                    type: 'text-input',
                    name: 'entry',
                    placeholder: 'Entry point (optional)'
                  }
                ]
              },
              {
                type: 'group',
                inputs: [
                  {
                    type: 'submit',
                    text: 'Analyse'
                  }
                ]
              }
            ]
          }
        />
        <Progress loading={this.state.loading} />

        { moduleMap }

        { this.state.modules ?
            <Form
              onSubmit={this.searchModule.bind(this)}
              inputs={
                [
                  {
                    type: 'group',
                    label: 'Search for module',
                    inputs: [
                      {
                        type: 'text-input',
                        name: 'module',
                        placeholder: 'Search Module'
                      }
                    ]
                  }
                ]
              }
            /> : null }
      </div>
    );
  }
}

