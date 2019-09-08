import {
  SET_SORT,
  SortActionTypes,
  SortFilter,
  SortState
} from 'store/sort/types';

// Initial sort state
const all: SortFilter[] = [
  {
    key: 'all',
    icon: 'sort'
  },
  {
    key: 'bright',
    icon: 'brightness_5'
  }
];
export const initialSortState: SortState = {
  all,
  current: all[0]
};

/**
 * Reduce an action into a new sort state.
 * @param state - Current sort state.
 * @param action - Redux action to reduce.
 */
const sortReducer = (
  state: SortState = initialSortState,
  action: SortActionTypes
): SortState => {
  switch (action.type) {
    case SET_SORT:
      return {
        all: state.all,
        current: action.payload
      };

    default:
      return state;
  }
};

export default sortReducer;
