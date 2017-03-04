import {
  Map,
  List,
  fromJS
} from 'immutable';

import {
  curry
} from 'ramda';

const reducer = curry((state, action) => {
  switch(action.type) {
    case FETCH_SCRIPT:
    default:
      return state;
  };
})

export default (defaults) => {

}

