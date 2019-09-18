// Reducer state
export interface SearchState {
  query: string;
}

// Action types
export const SET_SEARCH = 'store/search/SET_SEARCH';

interface SetSearch {
  type: typeof SET_SEARCH;
  payload: string;
}

export type SearchActionTypes = SetSearch;
