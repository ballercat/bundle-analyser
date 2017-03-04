import {
  tap,
  compose
} from 'ramda';

export default (konsole = global.console) => ({
  log: tap(konsole.log),
  logBefore: fn => compose(fn, konsole.log),
  logAfter: fn => compose(konsole.log, fn)
});

