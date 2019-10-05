import { Idea } from 'types';

// Reducer state
export interface IdeasState {
  all: Idea[];
  status: string;
  message: string;
}

// Action types
export const DELETE_IDEA_FAILURE = 'store/ideas/DELETE_IDEA_FAILURE';
export const DELETE_IDEA_SUCCESS = 'store/ideas/DELETE_IDEA_SUCCESS';
export const FETCH_IDEAS_FAILURE = 'store/ideas/FETCH_IDEAS_FAILURE';
export const FETCH_IDEAS_SUCCESS = 'store/ideas/FETCH_IDEAS_SUCCESS';
export const FETCH_IDEA_SUCCESS = 'store/ideas/FETCH_IDEA_SUCCESS';
export const FETCH_IDEA_FAILURE = 'store/ideas/FETCH_IDEA_FAILURE';
export const FETCH_USER_IDEAS_FAILURE = 'store/ideas/FETCH_USER_IDEAS_FAILURE';
export const FETCH_USER_IDEAS_SUCCESS = 'store/ideas/FETCH_USER_IDEAS_SUCCESS';
export const POST_IDEA_FAILURE = 'store/ideas/POST_IDEA_FAILURE';
export const POST_IDEA_SUCCESS = 'store/ideas/POST_IDEA_SUCCESS';

interface DeleteIdeaFailure {
  type: typeof DELETE_IDEA_FAILURE;
  payload: string;
}

interface DeleteIdeaSuccess {
  type: typeof DELETE_IDEA_SUCCESS;
  payload: string;
}

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

interface PostIdeaFailure {
  type: typeof POST_IDEA_FAILURE;
  payload: string;
}

interface PostIdeaSuccess {
  type: typeof POST_IDEA_SUCCESS;
  payload: string;
}

export type IdeasActionTypes =
  | DeleteIdeaFailure
  | DeleteIdeaSuccess
  | FetchIdeasFailure
  | FetchIdeasSuccess
  | FetchIdeaFailure
  | FetchIdeaSuccess
  | FetchUserIdeasFailure
  | FetchUserIdeasSuccess
  | PostIdeaFailure
  | PostIdeaSuccess;
