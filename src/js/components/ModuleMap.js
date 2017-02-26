import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    const el = ReactDOM.findDOMNode(this);
    this.setState({
      d3: buildBubblemap({
        data: nextProps.modules,
        width: el.offsetWidth,
        height: el.offsetHeight,
        search: this.props.searchTerm
      })
    });
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.setState({
      d3: buildBubblemap({
        data: this.props.modules,
        width: el.offsetWidth,
        height: el.offsetHeight,
        search: this.props.searchTerm
      })
    });
  }

  render() {
    return (
      <div className="ModuleList">
        <rd3.Component data={this.state.d3} />
      </div>
    );
  }
}

