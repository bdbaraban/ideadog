import {
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_SUCCESS,
  IdeasActionTypes,
  IdeasState
} from 'store/ideas/types';

// Initial ideas state
export const initialIdeasState: IdeasState = {
  all: [],
  status: ''
};

/**
 * Reduce an action into a new ideas state.
 * @param state - Current ideas state.
 * @param action - Redux action to reduce.
 */
const ideasReducer = (
  state: IdeasState = initialIdeasState,
  action: IdeasActionTypes
): IdeasState => {
  switch (action.type) {
    case FETCH_IDEAS_SUCCESS:
      return {
        all: action.payload,
        status: ''
      };

    case FETCH_IDEAS_FAILURE:
      return {
        all: [],
        status: action.payload
      };

    default:
      return state;
  }
};

export default ideasReducer;
