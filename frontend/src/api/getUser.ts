import { NotFoundError } from 'navi';
import { User } from '../types';

/**
 * getUser parameter types
 */
interface SearchParameters {
  // The key of the user to fetch
  key: string;
}

/**
 * Fetches a single user from the IdeaDog API
 */
const getUser = async ({ key }: SearchParameters): Promise<User> => {
  // const response = await fetch(`/api/user/${key}`);
  // const data: Idea[] = await response.json();

  /*
  if (!data) {
    throw new NotFoundError(`Idea with ID '${key}' does not exist.`);
  }
  return data;
  */

  return {};
};

export default getUser;
