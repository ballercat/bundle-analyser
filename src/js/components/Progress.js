import React, {Component} from 'react';
import '../../scss/components/Progress';

export default (props) => (
  <span style={
      {
        display: props.loading ? '' : 'none'
      }
    }>
     <div className="loader"></div>
  </span>
)
