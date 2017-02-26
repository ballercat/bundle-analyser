import React, { Component } from 'react';
import rd3 from 'react-d3-library';
import buildBubblemap from '../d3/bubblemap';
import { curry } from 'ramda';
import '../../scss/components/ModuleList';

export default class ModuleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d3: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      d3: buildBubblemap({
        modules: nextProps.modules,
        width: this.moduleList.offsetWidth,
        height: this.moduleList.offsetHeight
      })
    });
  }

  componentDidMount() {
    this.setState({
      d3: buildBubblemap({
        modules: this.props.modules,
        width: this.moduleList.offsetWidth,
        height: this.moduleList.offsetHeight
      })
    });
  }

  render() {
    return (
      <div className="ModuleList" ref={(el) => this.moduleList = el}>
        <rd3.Component data={this.state.d3} />
      </div>
    );
  }
}

