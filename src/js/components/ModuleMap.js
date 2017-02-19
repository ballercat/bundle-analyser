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
      d3: buildBubblemap(nextProps.modules)
    });
  }

  componentDidMount() {
    this.setState({
      d3: buildBubblemap(this.props.modules)
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

