import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import buildTree from '../d3/depTree';
import '../../scss/components/ModuleDetail';

export default class Detail extends Component {
	componentDidMount() {
		const container = findDOMNode(this);
    const target = container.querySelector('.tree');
    const tree = buildTree({
      width: target.offsetWidth,
      height: target.offsetHeight,
      data: this.props.data
    });
    target.appendChild(tree);
	}

  render() {
    return(
      <div className="ModuleDetail" style={ {display: this.props.data ? null : 'none'} }>
        <div className="ModuleDetail-content">
          <span className="ModuleDetail-close" onClick={this.props.onClose}></span>
          <div className="tree"></div>
        </div>
      </div>
    );
  }
};
