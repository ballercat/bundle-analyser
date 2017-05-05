import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import '../../scss/components/ModuleDetail';

export default class Detail extends Component {
  getRefsList(items) {
    return <ul className="ModuleDetail-List"> 
            {
              items.map(item => <li className="ModuleDetail-ListItem">{item}</li>)
            } 
           </ul>;
  }

  getDepsList(items) {
    return <ul className="ModuleDetail-List"> 
            {
              items.map(item => <li className="ModuleDetail-ListItem">{item.name} - {item.size} KB</li>)
            } 
           </ul>;
  }

  getTotalModuleSize(items) {
     return items.reduce((acc, item) => {return acc + item.size}, 0) 
  }

  render() {
    const refsList = this.getRefsList(this.props.data.refs);
    const depsList = this.getDepsList(this.props.data.deps);
    return(
      <div className="ModuleDetail" style={ {display: this.props.data ? null : 'none'} }>
        <div className="ModuleDetail-content">
          <span className="ModuleDetail-close" onClick={this.props.onClose}></span>
          <ul className="ModuleDetail-List">
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Selected Module</li>
            <li className="ModuleDetail-ListItem">{this.props.data.name}</li>
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Module Size</li>
            <li className="ModuleDetail-ListItem">{this.props.data.size}kb</li>
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Module Size with dependencies</li>
            <li className="ModuleDetail-ListItem">{this.props.data.size + this.getTotalModuleSize(this.props.data.deps)} KB</li>
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Modules using this module</li>
            <li className="ModuleDetail-ListItem">{refsList}</li>
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Modules used by this module</li>
            <li className="ModuleDetail-ListItem">{depsList}</li>
          </ul>
        </div>
      </div>
    );
  }
};
