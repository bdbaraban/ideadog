import { SearchActionTypes, SearchState, SET_SEARCH } from 'store/search/types';

// Initial search state
export const initialSearchState: SearchState = {
  query: ''
};

/**
 * Reduce an action into a new search state.
 * @param state - Current search state.
 * @param action - Redux action to reduce.
 */
const searchReducer = (
  state: SearchState = initialSearchState,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        query: action.payload
      };

    default:
      return state;
  }
};

export default searchReducer;
