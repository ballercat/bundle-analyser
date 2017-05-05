import logger from '../logger';
const { logBefore } = logger();

export const detailModule = target => ({
  type: 'DETAIL_MODULE',
  ...target
});

export const dismissDetail = () => ({
  type: 'DISMISS_MODULE'
});

export default (state = { module: null }, action) => {
  switch (action.type) {
    case 'DETAIL_MODULE': return { ...state, ...action };
    case 'DISMISS_MODULE': return {};
    default: return state;
  };
};
