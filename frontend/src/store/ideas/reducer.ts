import {
  DELETE_IDEA_FAILURE,
  DELETE_IDEA_SUCCESS,
  FETCH_IDEA_FAILURE,
  FETCH_IDEA_SUCCESS,
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS,
  IdeasActionTypes,
  IdeasState,
  POST_IDEA_FAILURE,
  POST_IDEA_SUCCESS
} from './types';

// Initial ideas state
export const initialIdeasState: IdeasState = {
  all: [],
  status: 'No bamboozle, there are no more ideas.',
  message: ''
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
    case FETCH_IDEA_SUCCESS:
    case FETCH_USER_IDEAS_SUCCESS:
      return {
        all: action.payload,
        status: 'No bamboozle, there are no more ideas.',
        message: state.message
      };

    case FETCH_IDEAS_FAILURE:
    case FETCH_IDEA_FAILURE:
    case FETCH_USER_IDEAS_FAILURE:
      return {
        all: [],
        status: action.payload,
        message: state.message
      };

    case POST_IDEA_FAILURE:
    case POST_IDEA_SUCCESS:
    case DELETE_IDEA_FAILURE:
      return {
        all: state.all,
        status: state.status,
        message: action.payload
      };

    case DELETE_IDEA_SUCCESS:
      return {
        all: state.all.filter(idea => idea.key !== action.payload),
        status: 'No bamboozle, there are no more ideas.',
        message: 'Idea deleted 🗑️.'
      };

    default:
      return state;
  }
};

export default ideasReducer;
