import React, { Component } from 'react';
import {map, curry} from 'ramda';
import '../../scss/components/Module';

const truncate = (max, str) => str.length > max ? str.substr(0, max - 3) + '...' : str;
const getName = curry(truncate)(25);

const baseSize = 10;

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

    let sqr = this.props.size * this.props.areaPerChar;
    sqr = Math.sqrt(sqr);
    state.style = {
      height: `${sqr}vh`,
      width: `${sqr}vw`
    };

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

