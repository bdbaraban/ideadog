import { Action } from 'redux';
import 'isomorphic-unfetch';

import { ActionType } from 'store';
import {
  ADD_SELECTED_TAG,
  FETCH_TAGS_FAILURE,
  FETCH_TAGS_SUCCESS,
  REMOVE_SELECTED_TAG,
  TagsActionTypes
} from './types';

/**
 * Fetch tags from the IdeaDog API.
 */
export const fetchTags = (): ActionType => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/tags`;

  try {
    const response = await fetch(query);
    const data = await response.json();

    return dispatch({
      type: FETCH_TAGS_SUCCESS,
      payload: data
    });
  } catch {
    return dispatch({
      type: FETCH_TAGS_FAILURE,
      payload: 'Could not fetch tags - please try again later.'
    });
  }
};

/**
 * Add a selected tag.
 * @param tag - Name of the seleected tag.
 */
export const addSelectedTag = (tag: string): TagsActionTypes => {
  return {
    type: ADD_SELECTED_TAG,
    payload: tag
  };
};

/**
 * Remove a selected tag.
 * @param tag - Name of the removed tag.
 */
export const removeSelectedTag = (tag: string): TagsActionTypes => {
  return {
    type: REMOVE_SELECTED_TAG,
    payload: tag
  };
};
