import React, { Component } from 'react';
import PickSource from './PickSource';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  addSource(options) {

  }

  render() {
    return (
      <div className="App">
        <PickSource onSubmit={this.addSource.bind(this)} />
      </div>
    );
  }
}

