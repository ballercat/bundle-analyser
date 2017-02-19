import React, { Component } from 'react';
import {map, curry} from 'ramda';
import '../../scss/components/Module';

const truncate = (max, str) => str.length > max ? str.substr(0, max - 3) + '...' : str;
const getName = curry(truncate)(25);

const Dependency = (props) => (
  <div className="Module">
    <ul>
      <li><span>{props.name}</span></li>
      <li><span>{props.size}</span></li>
    </ul>
  </div>
);

export default class Module extends Component {
  constructor(props) {
    super(props);
    let state = {};

    if (props.size) {
      let sqr = Math.round(Math.sqrt(props.size));
      state.style = {
        height: `${200 + sqr * 2}px`,
        width: `${200 + sqr * 2}px`
      };
    } else {
      state.style = {
        height: '200px',
        width: '200px'
      };
    }

    this.state = state;
  }

  render() {
    return (
      <div className="Module" style={this.state.style}>
        <span className="Module-name">{getName(this.props.name)}</span>

        <div className="ModuleList">
        </div>
      </div>
    )
  }
}

