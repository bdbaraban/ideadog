import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import fetch from 'isomorphic-unfetch';
import { AppState } from 'store';
import {
  FETCH_IDEA_FAILURE,
  FETCH_IDEAS_FAILURE,
  FETCH_IDEA_SUCCESS,
  FETCH_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE
} from 'store/ideas/types';

/**
 * Fetch ideas from the IdeaDog API.
 */
export const fetchIdeas = (
  sort = 'all',
  search = '',
  tags = ''
): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch
): Promise<Action<string>> => {
  let query = `${process.env.IDEADOG_API}/ideas`;
  query += sort !== 'all' ? `/${encodeURI(sort)}` : '';
  query += search !== '' ? `?q=${encodeURI(search)}` : '';
  query += tags !== '' ? `?tags=${encodeURI(tags)}` : '';
  console.log('Fetching ideas at', query);
  const response = await fetch(query);

  const data = await response.json();

  if (!data) {
    return dispatch({
      type: FETCH_IDEAS_FAILURE,
      payload: 'Could not fetch ideas - please try again later.'
    });
  }
  return dispatch({
    type: FETCH_IDEAS_SUCCESS,
    payload: data
  });
};

/**
 * Fetch a single idea from the IdeaDog API.
 */
export const fetchIdea = (
  key = ''
): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/idea/${key}`;
  console.log('Fetching idea at', query);
  const response = await fetch(query);

  const data = await response.json();

  if (!data) {
    return dispatch({
      type: FETCH_IDEA_FAILURE,
      payload: `Idea with ID ${key} does not exist.`
    });
  }
  return dispatch({
    type: FETCH_IDEA_SUCCESS,
    payload: data
  });
};

/**
 * Fetch ideas for a given user from the IdeaDog API.
 */
export const fetchUserIdeas = (
  key = ''
): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/user/${key}/ideas`;
  console.log('Fetching user ideas at', query);
  const response = await fetch(query);

  const data = await response.json();

  if (!data) {
    return dispatch({
      type: FETCH_USER_IDEAS_FAILURE,
      payload: `User with ID ${key} does not exist.`
    });
  }
  return dispatch({
    type: FETCH_USER_IDEAS_SUCCESS,
    payload: data
  });
};
