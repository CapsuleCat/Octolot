import * as ITEMS from '../constants';

export const filter = (f) => {
  return {
    type: ITEMS.FILTER,
    filter: f,
  };
};

export const clearFilter = () => {
  return {
    type: ITEMS.CLEAR_FILTER,
  };
};
