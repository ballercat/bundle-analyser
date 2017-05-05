import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import '../../scss/components/ModuleHoverDetail';

export default class ModuleHoverDetail extends Component {

  generateHoverDetails(data = {name: '-', size: 0, deps: [], refs: []}) {
    return <ul className="ModuleHoverDetail-List">
            <li className="ModuleHoverDetail-ListItem ModuleHoverDetail-LeftPane">Module Name</li>
            <li className="ModuleHoverDetail-ListItem">{data.name}</li>
            <li className="ModuleHoverDetail-ListItem ModuleHoverDetail-LeftPane">Size</li>
            <li className="ModuleHoverDetail-ListItem">{data.size}kb</li>
            <li className="ModuleHoverDetail-ListItem ModuleHoverDetail-LeftPane">Number of dependencies</li>
            <li className="ModuleHoverDetail-ListItem">{data.deps.length}</li>
            <li className="ModuleHoverDetail-ListItem ModuleHoverDetail-LeftPane">Number of references</li>
            <li className="ModuleHoverDetail-ListItem">{data.refs.length}</li>
          </ul>;
  }

  render() {
    const hoverDetails = this.generateHoverDetails(this.props.data);
    return(
      <div>
        {hoverDetails}
      </div>
    );
  }
};
