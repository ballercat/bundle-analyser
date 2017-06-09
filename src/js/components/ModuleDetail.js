import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import '../../scss/components/ModuleDetail';
import sunburst from '../d3/sunburst';

export default class Detail extends Component {

constructor() {
  super();
  this.data = [];
  this.accountedModules = [];
}

componentDidMount() {
  // Hardcore hardcode
    sunburst({
      width: window.innerWidth - 200,
      height: window.innerHeight - 200,
      data: this.data
    });
	}

  getRefsList(items) {
    return <ul className="ModuleDetail-List"> 
            {
              items.map((item, index) => <li className="ModuleDetail-ListItem" key={index}>{item}</li>)
            } 
           </ul>;
  }

  getDepsList(items) {
    return <ul className="ModuleDetail-List"> 
            {
              items.map((item, index) => <li className="ModuleDetail-ListItem" key={index}>{item.name} - {item.size} KB</li>)
            }
           </ul>;
  }

  getPathToRootModule(root, deps, accountedModules) {
    deps.map((dep) => {
      let moduleSize = dep.size;
      // If a module has already been accounted in terms of size on the subburst chart
      // don't add it to the chart. Setting the size to 0 would basically mean it won't show up
      // as a dupliate in the chart.
      if(accountedModules.indexOf(dep.name) > -1) {
        moduleSize = 0;
      } else {
        accountedModules.push(dep.name);
      }
      root.children.push({
        'name': dep.name,
        'size': moduleSize,
        'children' :[]
      });
      // Use classic recusrion and breadth first search tecnique to scan the dependencies
      if(dep.deps.length != 0) {
        root.children[root.children.length - 1] = this.getPathToRootModule(root.children[root.children.length - 1], dep.deps, accountedModules);
      }
    }, [this]);
    // the above recursion has sideeffects but works well, so ignoring the mess for now.
    return root;
  }

  render() {
    const refsList = this.getRefsList(this.props.data.refs);
    const depsList = this.getDepsList(this.props.data.deps);
    // Setup base case for the recusion to work.
    this.data = {
      'name': this.props.data.name,
      'children': []
    };
    // Call upon the recursionnnn ... 
    this.getPathToRootModule(this.data, this.props.data.deps, [this.props.data.name]);
    return(
      <div className="ModuleDetail" style={ {display: this.props.data ? null : 'none'} }>
        <div className="ModuleDetail-content">
          <span className="ModuleDetail-close" onClick={this.props.onClose}></span>
          <ul className="ModuleDetail-List">
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Selected Module</li>
            <li className="ModuleDetail-ListItem">{this.props.data.name}</li>
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Module Size</li>
            <li className="ModuleDetail-ListItem">{this.props.data.size}kb</li>
            <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Modules using this module</li>
            <li className="ModuleDetail-ListItem">{refsList}</li>
            <div id="main">
              <li className="ModuleDetail-ListItem ModuleDetail-LeftPane">Dependency chart for this module</li>
              <div id="sequence"></div>
              <div id="chart">
                <div id="explanation">
                  <span id="sizeOfModule"></span>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    );
  }
};
