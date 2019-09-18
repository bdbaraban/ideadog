import { SortFilter, SET_SORT, SortActionTypes } from './types';

/**
 * Set the current sorting filter.
 * @param filter - New sorting filter.
 */
export const setSort = (filter: SortFilter): SortActionTypes => {
  return {
    type: SET_SORT,
    payload: filter
  };
};
