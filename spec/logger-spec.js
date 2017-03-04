import {
  is
} from 'ramda';
import logger from '../src/js/logger';

const isFunction = is(Function);

let mock, log, logBefore, logAfter;

beforeEach(() => {
  mock = { log: function() {} };
  spyOn(mock, 'log');
  const _logger = logger(mock);
  log = _logger.log;
  logBefore = _logger.logBefore;
  logAfter = _logger.logAfter;
});

describe('Logger', () => {

  describe('log', () => {
    it('is a function', () => {
      expect(isFunction(log)).toBe(true);
    });
    it('logs a value', () => {
     log('test');
     expect(mock.log).toHaveBeenCalledWith('test');
    });
    it('is a pass-through function, returning the value passed in', () => {
      expect(log('test')).toBe('test');
    });
  });

  describe('logAfter', () => {
    it('returns a function', () => {
      expect(isFunction(logAfter(() => 'foo'))).toBe(true);
    });
    it('logs result of a function wrapped', () => {
      let x = 0;
      let test = logAfter(() => x + 1);
      test();
      expect(mock.log).toHaveBeenCalledWith(1);
    });
  });

  describe('logBefore', () => {
    it('returns a function', () => {
      expect(isFunction(logBefore(() => 'foo'))).toBe(true);
    });
    it('logs value passed into wrapped function', () => {
      let x = 0;
      let test = logBefore((y) => x + y);
      test(1);
      expect(mock.log).toHaveBeenCalledWith(1);
    });
  });
});
