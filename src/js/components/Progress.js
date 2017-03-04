import React, {Component} from 'react';

export default (props) => (
  <span style={
      {
        display: props.loading ? '' : 'none'
      }
    }>
      Loading...
  </span>
)

