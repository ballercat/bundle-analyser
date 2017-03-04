import { Map } from 'immutable';
import {
 importScript
} from '../amd';

export const MODULES_LOADED = 'MODULES_LOADED';
export const loadModules = modules => ({type: MODULES_LOADED, modules: modules});
export const loadBundle = options => importScript(options.source);
export default (state = Map({ modules: [] }), action) => {
  switch (action.type) {
    case MODULES_LOADED: return state.set('modules', action.modules);
    default: return state;
  };
};


