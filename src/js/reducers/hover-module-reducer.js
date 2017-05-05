export const hoverModule = target => ({
  type: 'HOVER_DETAIL_MODULE',
  ...target
})

export const hoverOut = () => ({
  type: 'DISMISS_HOVER_DETAIL_MODULE'
});

export default (state = { module: null }, action) => {
  switch (action.type) {
    case 'HOVER_DETAIL_MODULE': return { ...state, ...action };
    case 'DISMISS_HOVER_DETAIL_MODULE': return {};
    default: return state;
  };
};
