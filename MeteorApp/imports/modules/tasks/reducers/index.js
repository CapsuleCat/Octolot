import {
  TASK_SET_FILTER,
  SHOW_ALL
} from '../constants';

export default (state = {
  filter: SHOW_ALL,
}, action) => {
  switch(action.type) {
    case TASK_SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};
