import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FETCH_USER_FAILURE, FETCH_USER_SUCCESS } from 'store/user/types';
import { AppState } from 'store';
import { getAPI } from 'utils';

/**
 * Fetch ideas from the API.
 */
export const fetchUser = (
  bearer: string
): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch
): Promise<Action<string>> => {
  const query = `${getAPI()}/user`;
  console.log('Fetching ideas at ', query);

  const response = await fetch(query, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  });

  const data = await response.json();

  if (!data) {
    return dispatch({
      type: FETCH_USER_FAILURE
    });
  }
  return dispatch({
    type: FETCH_USER_SUCCESS,
    payload: data
  });
};
