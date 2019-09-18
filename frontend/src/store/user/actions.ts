import { Action } from 'redux';
import 'isomorphic-unfetch';

import { ActionType } from 'store';
import { FETCH_USER_FAILURE, FETCH_USER_SUCCESS } from './types';

/**
 * Fetch logged in user from the IdeaDog API.
 * @param bearer - API bearer token for logged in user.
 */
export const fetchUser = (bearer: string): ActionType => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${process.env.IDEADOG_API}/user`;

  try {
    const response = await fetch(query, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${bearer}`
      }
    });
    const data = await response.json();

    return dispatch({
      type: FETCH_USER_SUCCESS,
      payload: {
        profile: data,
        bearer
      }
    });
  } catch {
    return dispatch({
      type: FETCH_USER_FAILURE
    });
  }
};
