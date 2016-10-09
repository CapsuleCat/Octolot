import * as SEARCH from '../constants';

export default (state = {
  ui: {
    open: false,
  }
}, action) => {
  switch (action.type) {
  case SEARCH.OPEN:
    return {
      ...state,
      ui: {
        ...state.ui,
        open: true,
      },
    };
  case SEARCH.CLOSE:
    return {
      ...state,
      ui: {
        ...state.ui,
        open: false
      },
    };
  default:
    return state;
  }
};
