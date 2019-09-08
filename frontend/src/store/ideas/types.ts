import { Idea } from 'types';

// Reducer state
export interface IdeasState {
  all: Idea[];
  status: string;
}

// Action types
export const FETCH_IDEAS_FAILURE = 'FETCH_IDEAS_FAILURE';
export const FETCH_IDEAS_SUCCESS = 'FETCH_IDEAS_SUCCESS';

interface FetchIdeasFailure {
  type: typeof FETCH_IDEAS_FAILURE;
  payload: string;
}

interface FetchIdeasSuccess {
  type: typeof FETCH_IDEAS_SUCCESS;
  payload: Idea[];
}

export type IdeasActionTypes = FetchIdeasFailure | FetchIdeasSuccess;
