import { NotFoundError } from 'navi';
import { User } from '../types';

/**
 * Fetches a single user from the IdeaDog API
 */
const getUser = async (
  key: string = '',
  bearer: string = ''
): Promise<User> => {
  let route = 'http://localhost:5000/api/user';
  if (key !== '') {
    route += key;
  }

  let options: RequestInit = {
    method: 'GET',
    credentials: 'include'
  };
  if (bearer !== '') {
    options.headers = { Authorization: `Bearer ${bearer}` };
  }

  const response = await fetch(route, options);

  const data: User[] = await response.json();
  if (!data) {
    throw new NotFoundError(`Could not find user with ID ${key}.`);
  }
  return data[0];
};

export default getUser;
