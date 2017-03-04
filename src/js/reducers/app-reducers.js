import bundle, {
  MODULES_LOADED,
  loadBundle,
} from './bundle-reducer';
import {
  Map,
  List,
  fromJS
} from 'immutable';

import {
  curry
} from 'ramda';

import appConfig from '../../defaults';

const FETCH_SCRIPT = 'FETCH_SCRIPT';
const pickSource = (state = appConfig.pick_source) => state;
const progress = (state = appConfig.progress, action) => {
  switch (action.type) {
    case FETCH_SCRIPT: return {...state, loading: true};
    case MODULES_LOADED: return {...state, loading: false};
    default: return state;
  };
};

export const fetchScript = form => dispatch => {
  dispatch({ type: FETCH_SCRIPT });
  return loadBundle(form).then(
    modules => dispatch({
      modules,
      type: MODULES_LOADED
    })
  )
};

export default {
  pick_source: pickSource,
  progress,
  bundle
};

