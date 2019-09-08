import { Tag } from 'types';

// Reducer state
export interface TagsState {
  all: Tag[];
  selected: { [key: string]: boolean };
  status: string;
}

// Action types
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const ADD_SELECTED_TAG = 'ADD_SELECTED_TAG';
export const REMOVE_SELECTED_TAG = 'REMOVE_SELECTED_TAG';

interface FetchTagsFailure {
  type: typeof FETCH_TAGS_FAILURE;
  payload: string;
}

interface FetchTagsSuccess {
  type: typeof FETCH_TAGS_SUCCESS;
  payload: Tag[];
}

interface AddSelectedTag {
  type: typeof ADD_SELECTED_TAG;
  payload: string;
}

interface RemoveSelectedTag {
  type: typeof REMOVE_SELECTED_TAG;
  payload: string;
}

export type TagsActionTypes =
  | FetchTagsFailure
  | FetchTagsSuccess
  | AddSelectedTag
  | RemoveSelectedTag;
