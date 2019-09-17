import { Action } from 'redux';
import 'isomorphic-unfetch';

import { ActionType } from 'store';
import {
  FETCH_IDEA_FAILURE,
  FETCH_IDEA_SUCCESS,
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS
} from './types';

/**
 * Fetch ideas from the IdeaDog API.
 * @param sort - Sorting filter (`all` or `bright`).
 * @param search - Search query.
 * @param tags - Tags filter (comma-separated string).
 */
export const fetchIdeas = (
  sort = 'all',
  search = '',
  tags = ''
): ActionType => async (dispatch): Promise<Action<string>> => {
  let query = `${process.env.IDEADOG_API}/ideas`;
  query += sort !== 'all' ? `/${encodeURIComponent(sort)}` : '';
  query += search !== '' ? `?q=${encodeURIComponent(search)}` : '';
  query +=
    tags !== ''
      ? search === ''
        ? `?tags=${encodeURIComponent(tags)}`
        : `&tags=${encodeURIComponent(tags)}`
      : '';

  try {
    const response = await fetch(query);
    const data = await response.json();

    return dispatch({
      type: FETCH_IDEAS_SUCCESS,
      payload: data
    });
  } catch {
    return dispatch({
      type: FETCH_IDEAS_FAILURE,
      payload: 'Could not fetch ideas - please try again later.'
    });
  }
};

/**
 * Fetch a single idea from the IdeaDog API.
 * @param key - Key of idea to fetch.
 */
export const fetchIdea = (key = ''): ActionType => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/idea/${key}`;

  try {
    const response = await fetch(query);
    const data = await response.json();

    if (data.length === 0) {
      throw new Error();
    }

    return dispatch({
      type: FETCH_IDEA_SUCCESS,
      payload: data
    });
  } catch {
    return dispatch({
      type: FETCH_IDEA_FAILURE,
      payload: `Idea with ID ${key} does not exist.`
    });
  }
};

/**
 * Fetch ideas posted by a given user from the IdeaDog API.
 * @param key - Key of user for which to fetch ideas.
 */
export const fetchUserIdeas = (key = ''): ActionType => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/user/${key}/ideas`;

  try {
    const response = await fetch(query);
    const data = await response.json();

    if (data.length === 0) {
      throw new Error();
    }

    return dispatch({
      type: FETCH_USER_IDEAS_SUCCESS,
      payload: data
    });
  } catch {
    return dispatch({
      type: FETCH_USER_IDEAS_FAILURE,
      payload: `User with ID ${key} does not exist.`
    });
  }
};
