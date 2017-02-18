import React from 'react';
import { curry } from 'ramda';

let widgets = [];

const getWidget = (Widget, props) => {
  let widget = widgets[props.name];
  if (!widget) {
    widget = (<Widget {...props} />);
  }

  return widgets[props.name] = widget;
};


export default curry(getWidget);

