import { User } from 'types';

// Reducer state
export interface UserState {
  profile: User;
  bearer: string;
  isAuthenticated: boolean;
}

// Action types
export const FETCH_USER_FAILURE = 'store/user/FETCH_USER_FAILURE';
export const FETCH_USER_SUCCESS = 'store/user/FETCH_USER_SUCCESS';

interface FetchUserSuccess {
  type: typeof FETCH_USER_SUCCESS;
  payload: {
    profile: User;
    bearer: string;
  };
}

interface FetchUserFailure {
  type: typeof FETCH_USER_FAILURE;
}

export type UserActionTypes = FetchUserSuccess | FetchUserFailure;
