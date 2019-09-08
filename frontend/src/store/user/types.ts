import { User } from 'types';

// Reducer state
export interface UserState {
  profile: User;
  isAuthenticated: boolean;
}

// Action types
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

interface FetchUserSuccess {
  type: typeof FETCH_USER_SUCCESS;
  payload: User;
}

interface FetchUserFailure {
  type: typeof FETCH_USER_FAILURE;
}

export type UserActionTypes = FetchUserSuccess | FetchUserFailure;
