import {
  TASK_SET_FILTER
} from '../constants';

export const setFilter = (filter) => {
  return {
    type: TASK_SET_FILTER,
    filter,
  };
};
