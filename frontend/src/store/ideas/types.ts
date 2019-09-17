import { Idea } from 'types';

// Reducer state
export interface IdeasState {
  all: Idea[];
  status: string;
}

// Action types
export const FETCH_IDEAS_FAILURE = 'store/ideas/FETCH_IDEAS_FAILURE';
export const FETCH_IDEAS_SUCCESS = 'store/ideas/FETCH_IDEAS_SUCCESS';
export const FETCH_IDEA_SUCCESS = 'store/ideas/FETCH_IDEA_SUCCESS';
export const FETCH_IDEA_FAILURE = 'store/ideas/FETCH_IDEA_FAILURE';
export const FETCH_USER_IDEAS_FAILURE = 'store/ideas/FETCH_USER_IDEAS_FAILURE';
export const FETCH_USER_IDEAS_SUCCESS = 'store/ideas/FETCH_USER_IDEAS_SUCCESS';

interface FetchIdeasFailure {
  type: typeof FETCH_IDEAS_FAILURE;
  payload: string;
}

interface FetchIdeasSuccess {
  type: typeof FETCH_IDEAS_SUCCESS;
  payload: Idea[];
}

interface FetchIdeaFailure {
  type: typeof FETCH_IDEA_FAILURE;
  payload: string;
}

interface FetchIdeaSuccess {
  type: typeof FETCH_IDEA_SUCCESS;
  payload: Idea[];
}

interface FetchUserIdeasFailure {
  type: typeof FETCH_USER_IDEAS_FAILURE;
  payload: string;
}

interface FetchUserIdeasSuccess {
  type: typeof FETCH_USER_IDEAS_SUCCESS;
  payload: Idea[];
}

export type IdeasActionTypes =
  | FetchIdeasFailure
  | FetchIdeasSuccess
  | FetchIdeaFailure
  | FetchIdeaSuccess
  | FetchUserIdeasFailure
  | FetchUserIdeasSuccess;
