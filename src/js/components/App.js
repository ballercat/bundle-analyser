import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from './Form';
import Progress from './Progress';
import ModuleMap from './ModuleMap';
import { fetchScript } from '../reducers/app-reducers';
import {
  has,
  map,
  curry,
  prop,
  tap,
  compose
} from 'ramda';

// Pick source form
const PickSource = connect(
  state => ({...state.get('pick_source')}),
  dispatch => bindActionCreators({onSubmit: fetchScript}, dispatch)
)(Form);

// Loading indicator
const Loading = connect(
  state => ({...state.get('progress')})
)(Progress);

export default (props) => (
  <div className="App">
    <PickSource />
    <Loading />

  </div>
);

