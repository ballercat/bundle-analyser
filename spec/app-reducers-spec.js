/* eslint-env jasmine */
import reducerFactory from '../src/js/reducers/app-reducers';
import {
  is
} from 'ramda';

const isFunction = is(Function);

describe('App Reducer', () => {

  it('is a function', () => {
    expect(isFunction(reducerFactory)).toBe(true);
  });
  it('returns a function', () => {
    expect(isFunction(reducerFactory())).toBe(true);
  });
});
