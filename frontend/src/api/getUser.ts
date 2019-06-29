import { NotFoundError } from 'navi';
import { User } from '../types';

/**
 * Fetch a logged in user from the IdeaDog API.
 * @param bearer {string} - Bearer token of the current logged in user.
 */
const getUser = async (key: string | undefined = undefined): Promise<User> => {
  const route = key
    ? `http://localhost:5000/api/user/${key}`
    : 'http://localhost:5000/api/user';

  const response = await fetch(route, {
    method: 'GET',
    credentials: 'include'
  });

  const data: User[] = await response.json();
  if (!data) {
    throw new NotFoundError(`Could not find user with ID ${key}.`);
  }
  return data[0];
};

export default getUser;
