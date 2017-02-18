import React, { Component } from 'react';
import PickSource from './PickSource';
import Progress from './Progress';
import Link from './Link';
import {has} from 'ramda';
import define from '../amd';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    window.define = define;
  }

  addSource(options) {
    if (has('source', options)) {
      this.setState({
        ...options,
        loading: !this.state.loading
      });
    }
  }

  source() {
    if (this.state.source) {
      return (
        <Link source={this.state.source} />
      );
    }
  }

  render() {
    return (
      <div className="App">
        <PickSource onSubmit={this.addSource.bind(this)} />
        <Progress loading={this.state.loading} />
      </div>
    );
  }
}

