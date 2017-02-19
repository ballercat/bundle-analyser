import React, { Component } from 'react';
import '../../scss/components/ModuleList';

const truncate = (max, str) => str.length > max ? str.substr(0, max - 3) + '...' : str;
const getName = curry(truncate)(10);

export default class ModuleMap extends Component {

  render() {
    return (
      <div className="ModuleList" ref={(el) => this.moduleList = el}>
      </div>
    );
  }
}

