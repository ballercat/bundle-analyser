import React, { Component } from 'react';
import PickSource from './PickSource';
import Progress from './Progress';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  addSource(options) {
    this.setState({
      loading: !this.state.loading
    });
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

