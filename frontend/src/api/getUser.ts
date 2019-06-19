import { NotFoundError } from 'navi';
import { User } from '../types';

/**
 * Fetches a single user from the IdeaDog API
 */
const getUser = async (key: string): Promise<User> => {
  const response = await fetch(`http://localhost:5000/api/user/${key}`, {
    method: 'GET'
  });

  const data: User[] = await response.json();
  if (!data) {
    throw new NotFoundError(`User with ID ${key} does not exist.`);
  }
  return data[0];
};

export default getUser;
