import { SET_SEARCH, SearchActionTypes } from './types';

/**
 * Set the current search query.
 * @param query - New search query to set.
 */
export const setSearch = (query: string): SearchActionTypes => {
  return {
    type: SET_SEARCH,
    payload: query
  };
};
