/* eslint-env jasmine */
const reducerFactory = require('../src/js/reducers/app-reducers');

describe('App Reducer', () => {

  it('is a function, returning a function', () => {
    expect(reducerFactory).toBe(jasmine.any(Function));
  });
});
