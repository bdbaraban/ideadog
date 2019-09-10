import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import fetch from 'isomorphic-unfetch';
import { AppState } from 'store';
import { FETCH_IDEAS_FAILURE, FETCH_IDEAS_SUCCESS } from 'store/ideas/types';

/**
 * Fetch ideas from the API.
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
