import { NotFoundError } from 'navi';
import { API } from '../constants';
import { User } from '../types';

/**
 * Fetch a user from the IdeaDog API.
 * @param key {string} - The ID of the user to fetch (undefined if fetching logged in user).
 * @param bearer {string} - Logged in user's bearer token (undefined if not fetching logged in user).
 */
const getUser = async (
  key: string | undefined = undefined,
  bearer: string | undefined = undefined
): Promise<User> => {
  let route: string = key ? `${API}/user/${key}` : `${API}`;

  let options: RequestInit = {
    method: 'GET',
    credentials: 'include'
  };
  if (bearer) {
    options.headers = {
      Authorization: `Bearer ${bearer}`
    };
  }

  const response = await fetch(route, options);

  const data: User = await response.json();
  if (!data) {
    throw new NotFoundError(`Could not find user with ID ${key}.`);
  }
  return data;
};

export default getUser;
