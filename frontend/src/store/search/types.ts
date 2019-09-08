// Reducer state
export interface SearchState {
  query: string;
}

// Action types
export const SET_SEARCH = 'SET_SEARCH';

interface SetSearch {
  type: typeof SET_SEARCH;
  payload: string;
}

export type SearchActionTypes = SetSearch;
