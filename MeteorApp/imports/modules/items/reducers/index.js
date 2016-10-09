import * as ITEMS from '../constants';

export default (state = {
  filter: false,
}, action) => {
  switch(action.type) {
  case ITEMS.FILTER:
    return {
      ...state,
      filter: action.filter,
    };
  case ITEMS.CLEAR_FILTER:
    return {
      ...state,
      filter: false,
    };
  default:
    return state;
  }
};
