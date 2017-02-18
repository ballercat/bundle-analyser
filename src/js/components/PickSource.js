import React, { Component } from 'react';
import { map } from 'rambda';
import '../../scss/components/PickSource';

export default class PickSource extends Component {

  submit(e) {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit();
    }
  }

  render() {
    return (
      <form className="PickSource" onSubmit={this.submit.bind(this)}>
        <ul>
          <li className="PickSource-group">
            <label>Pick a Source to analyse</label>
            <input type="text" className="PickSource-divided" name="source" placeholder="Source"></input>
            <input type="text" className="PickSource-divided" name="entry" placeholder="Entry point (optional)"></input>
          </li>


          <li className="PickSource-group">
            <button type="submit" className="PickSource-submit">Analyse</button>
          </li>
        </ul>
      </form>
    );
  }
}

