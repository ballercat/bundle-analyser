/* eslint-env jasmine */
import reducer from '../src/js/reducers/app-reducers';
import {
  is
} from 'ramda';

const isObject = is(Object);

describe('App Reducer', () => {

  it('is an Object', () => {
    expect(isObject(reducer)).toBe(true);
  });
});
