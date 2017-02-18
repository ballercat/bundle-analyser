import React, { Component } from 'react';
import {map} from 'ramda';
import '../../scss/components/Module';

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
  }

  render() {
    return (
      <div className="Module">
        <span className="Module-name">{this.props.name}</span>

        <div className="ModuleList">
          {this.props.deps.slice(1).map((module, index) => (
            <Dependency key={index} {...module} />
          ))}
        </div>
      </div>
    )
  }
}

