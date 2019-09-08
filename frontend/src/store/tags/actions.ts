import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import fetch from 'isomorphic-unfetch';
import { AppState } from 'store';
import {
  ADD_SELECTED_TAG,
  FETCH_TAGS_FAILURE,
  FETCH_TAGS_SUCCESS,
  REMOVE_SELECTED_TAG,
  TagsActionTypes
} from 'store/tags/types';
import { getAPI } from 'utils';

/**
 * Fetch tags from the API.
 */
export const fetchTags = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => async (dispatch): Promise<Action<string>> => {
  const query = `${getAPI()}/tags`;
  console.log('Fetching tags at ', query);
  const response = await fetch(query);

  const data = await response.json();

  if (!data) {
    return dispatch({
      type: FETCH_TAGS_FAILURE,
      payload: 'Could not fetch tags - please try again later.'
    });
  }
  return dispatch({
    type: FETCH_TAGS_SUCCESS,
    payload: data
  });
};

/**
 * Add a selected tag.
 */
export const addSelectedTag = (tag: string): TagsActionTypes => {
  return {
    type: ADD_SELECTED_TAG,
    payload: tag
  };
};

/**
 * Remove a selected tag.
 */
export const removeSelectedTag = (tag: string): TagsActionTypes => {
  return {
    type: REMOVE_SELECTED_TAG,
    payload: tag
  };
};
