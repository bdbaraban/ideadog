import { Action } from 'redux';
import 'isomorphic-unfetch';

import { ActionType } from 'store';
import {
  DELETE_IDEA_FAILURE,
  DELETE_IDEA_SUCCESS,
  FETCH_IDEA_FAILURE,
  FETCH_IDEA_SUCCESS,
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS,
  POST_IDEA_FAILURE,
  POST_IDEA_SUCCESS
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

/**
 * Post an idea on the IdeaDog API.
 * @param text - The new idea text content.
 * @param owner_id - The key of the new idea's owner.
 * @param tags - Tags associated with the new idea.
 * @param bearer - API bearer token for logged in user & owner of idea.
 */
export const postIdea = (
  text: string,
  owner_id: string,
  tags: string[],
  bearer: string
): ActionType => async (dispatch): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/idea`;

  try {
    const response = await fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer
      },
      body: JSON.stringify({
        text,
        owner_id,
        tags
      })
    });

    if (response.status !== 200) {
      throw Error();
    }

    return dispatch({
      type: POST_IDEA_SUCCESS,
      payload: 'Idea posted! 🙌'
    });
  } catch {
    return dispatch({
      type: POST_IDEA_FAILURE,
      payload: 'Failed to post idea.'
    });
  }
};

/**
 * Delete an idea on the IdeaDog API.
 * @param key - Key of the idea to delete.
 * @param bearer - API bearer token for logged in user & owner of idea.
 */
export const deleteIdea = (key = '', bearer: string): ActionType => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/idea/${key}`;

  try {
    const response = await fetch(query, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer}`
      }
    });

    if (response.status !== 200) {
      throw Error();
    }

    return dispatch({
      type: DELETE_IDEA_SUCCESS,
      payload: key
    });
  } catch {
    return dispatch({
      type: DELETE_IDEA_FAILURE,
      payload: `Failed to delete ID with key ${key}.`
    });
  }
};
