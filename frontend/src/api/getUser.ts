import { User } from '../types';

/**
 * Fetches a single user from the IdeaDog API
 */
const getUser = async (bearer: string): Promise<User> => {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  });

  const data: User[] = await response.json();
  return data[0];
};

export default getUser;
