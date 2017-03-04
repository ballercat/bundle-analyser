import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const konsole = fn => compose(fn, tap(console.log));

const PickSource = connect(
  konsole(state => ({
    ...state.get('pick_source')
  }))
)(Form);
const Loading = connect(
  state => ({
    ...state.get('progress')
  })
)(Progress);

export default App = (props) => (
  <div className="App">
    <PickSource onSubmit={(form) => props.dispatch(fetchScript(form))} />
    <Loading />
  </div>
);

