import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import rd3 from 'react-d3-library';
import buildBubblemap from '../d3/bubblemap';
import { curry } from 'ramda';
import logger from '../logger'
import '../../scss/components/ModuleList';

const {
  log,
  logBefore
} = logger();

export default class ModuleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d3: []
    };
  }

  search(options) {
    this.state.searchCallback(options);
  }

  componentWillReceiveProps(nextProps) {
    const el = ReactDOM.findDOMNode(this);
    const searchCallback = (cb) => {
      this.setState({
        searchCallback: (options) => cb(options)
      });
    };
    this.setState({
      d3: buildBubblemap({
        data: nextProps.modules,
        width: el.offsetWidth,
        height: el.offsetHeight,
        searchCallback,
        clickHandler: log(this.props.onDetail)
      })
    });
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const searchCallback = curry((cb, options) => cb(options));
    this.setState({
      d3: buildBubblemap({
        data: this.props.modules,
        width: el.offsetWidth,
        height: el.offsetHeight,
        search: this.props.searchTerm,
        searchCallback,
        clickHandler: this.props.onDetail
      }),
      searchCallback
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

