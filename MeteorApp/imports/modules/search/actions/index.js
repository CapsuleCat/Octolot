import * as SEARCH from '../constants';

export const openSearch = () => {
  return {
    type: SEARCH.OPEN,
  };
};

export const closeSearch = () => {
  return {
    type: SEARCH.CLOSE,
  };
};
