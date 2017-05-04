import React, { Component } from 'react';

import '../../scss/components/PickSource';

const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(serialize(e.target.elements));
  }

export default function(props) {
  return (
  <form className="PickSource" onSubmit={handleSubmit}>
    <ul>
      <input type="text" className="PickSource-divided" name="source" placeholder="Paste the bundler link here"></input>
      <button type="submit" className="PickSource-submit">Analyze</button>
    </ul>
  </form>
  )
};
