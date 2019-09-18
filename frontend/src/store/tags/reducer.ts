import {
  ADD_SELECTED_TAG,
  FETCH_TAGS_FAILURE,
  FETCH_TAGS_SUCCESS,
  REMOVE_SELECTED_TAG,
  TagsActionTypes,
  TagsState
} from './types';

// Initial tags state
export const initialTagsState: TagsState = {
  all: [],
  selected: {},
  status: 'OK'
};

/**
 * Reduce an action into a new tags state.
 * @param state - Current tags state.
 * @param action - Redux action to reduce.
 */
const tagsReducer = (
  state: TagsState = initialTagsState,
  action: TagsActionTypes
): TagsState => {
  switch (action.type) {
    case FETCH_TAGS_SUCCESS:
      return {
        all: action.payload,
        selected: {},
        status: 'OK'
      };

    case FETCH_TAGS_FAILURE:
      return {
        all: [],
        selected: {},
        status: action.payload
      };

    case ADD_SELECTED_TAG:
      return {
        all: state.all,
        selected: { ...state.selected, [action.payload]: true },
        status: 'OK'
      };

    case REMOVE_SELECTED_TAG:
      return {
        all: state.all,
        selected: (({
          [action.payload]: _,
          ...others
        }): TagsState['selected'] => ({
          ...others
        }))(state.selected),
        status: 'OK'
      };

    default:
      return state;
  }
};

export default tagsReducer;
