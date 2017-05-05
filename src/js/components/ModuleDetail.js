import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import '../../scss/components/ModuleDetail';

export default class Detail extends Component {
  constructor() {
    super();
    this.getListItems = this.getListItems.bind(this);
  }

  getListItems(items) { 
    return items.map(item => <li>{item}</li>);
  }

  render() {
    const refsList = this.getListItems(this.props.data.refs);
    var depsNames = this.props.data.deps.map(function(a) {return a.name;});
    const depsList = this.getListItems(depsNames);
    return(
      <div className="ModuleDetail" style={ {display: this.props.data ? null : 'none'} }>
        <div className="ModuleDetail-content">
          <span className="ModuleDetail-close" onClick={this.props.onClose}></span>
          <p>Name of module selected: {this.props.data.name}</p>
          <p>Size of module: {this.props.data.size}kb</p>
          <p>Modules using this module:</p>
          <ul>
            {refsList}
          </ul>
          <p>Module dependencies:</p>
          <ul>
            {depsList}
          </ul>
        </div>
      </div>
    );
  }
};
