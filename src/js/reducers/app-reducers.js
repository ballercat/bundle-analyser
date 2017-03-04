import {
  Map,
  List,
  fromJS
} from 'immutable';

import {
  curry
} from 'ramda';

const FETCH_SCRIPT = 'FETCH_SCRIPT';

export const fetchScript = (form) => {
  return {
    type: FETCH_SCRIPT,
    ...form
  };
};

export default defaults => {
  return (state = Map(defaults), action) => {
    switch(action.type) {
      case FETCH_SCRIPT:
        return state.set('loading', true);
      default:
        return state;
    };
  };
}

