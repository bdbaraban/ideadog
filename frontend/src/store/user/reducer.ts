import {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  UserActionTypes,
  UserState
} from 'store/user/types';

// Empty user profile
const empty = {
  id: '',
  key: '',
  username: '',
  email: '',
  ideas: {},
  favorite: '',
  upvotes: 0,
  downvotes: 0,
  active: false,
  created_at: 0,
  votes: {}
};

// Initial user state
export const initialUserState: UserState = {
  profile: empty,
  bearer: '',
  isAuthenticated: false
};

/**
 * Reduce an action into a new user state.
 * @param state - Current user state.
 * @param action - Redux action to reduce.
 */
const userReducer = (
  state: UserState = initialUserState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        profile: action.payload.profile,
        bearer: action.payload.bearer,
        isAuthenticated: true
      };

    case FETCH_USER_FAILURE:
      return {
        profile: empty,
        bearer: '',
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default userReducer;
