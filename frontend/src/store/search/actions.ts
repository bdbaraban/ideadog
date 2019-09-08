import { SET_SEARCH, SearchActionTypes } from 'store/search/types';

/**
 * Set the current search query
 */
export const setSearch = (query: string): SearchActionTypes => {
  return {
    type: SET_SEARCH,
    payload: query
  };
};
