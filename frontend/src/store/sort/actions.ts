import { SortFilter, SET_SORT, SortActionTypes } from 'store/sort/types';

/**
 * Set the current sorting filter
 */
export const setSort = (filter: SortFilter): SortActionTypes => {
  return {
    type: SET_SORT,
    payload: filter
  };
};
