import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from './Form';
import Progress from './Progress';
import ModuleMap from './ModuleMap';
import ModuleDetail from './ModuleDetail';
import { fetchScript } from '../reducers/app-reducers';
import {
  detailModule,
  dismissDetail
} from '../reducers/module-reducer';
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
  state => ({...state.pick_source}),
  dispatch => bindActionCreators({
    onSubmit: fetchScript,
  }, dispatch)
)(Form);

// Loading indicator
const Loading = connect(
  state => ({...state.progress})
)(Progress);

const Bundle = connect(
  state => ({
    modules: state.bundle.get('modules')
  }),
  dispatch => bindActionCreators({
    onDetail: detailModule
  }, dispatch)
)(ModuleMap);

const Detail = connect(
  state => ({...state.detail}),
  dispatch => bindActionCreators({
    onClose: dismissDetail
  }, dispatch)
)(ModuleDetail);

export default (props) => (
  <div className="App">
    <PickSource />
    <Loading />
    <Bundle />
    { props.detail.data ? <Detail /> : null }
  </div>
);

