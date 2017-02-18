import React, { Component } from 'react';
import '../../scss/components/PickSource';

export default class PickSource extends Component {
  render() {
    return (
      <form className="PickSource">
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

