import React, { Component } from 'react';

export default class PickSource extends Component {
  render() {
    return (
      <form className="PickSource">

        <div className="PickSource-group">
          <label htmlFor="source">Source:</label>
          <input type="text" id="source" name="source"></input>
        </div>

        <div className="PickSource-group">
          <label htmlFor="source">Entry (optional):</label>
          <input type="text" id="entry" name="entry"></input>
        </div>

        <button type="submit" className="PickSource-submit">Analyse</button>
      </form>
    );
  }
}

