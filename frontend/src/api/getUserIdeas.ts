import { NotFoundError } from 'navi';
import { Idea } from '../types';

/**
 * getUserIdeas parameter types
 */
interface SearchParameters {
  // The key of the user to get ideas from
  key: string;
}

/**
 * Fetches all ideas posted by a given user from the IdeaDog API
 */
const getUserIdeas = async ({ key }: SearchParameters): Promise<Idea[]> => {
  // const response = await fetch(`/api/user/${key}/ideas`);
  // const data: Idea[] = await response.json();

  /*
  if (!data) {
    throw new NotFoundError(`Idea with ID '${key}' does not exist.`);
  }
  return data;
  */

  return [];
};

export default getUserIdeas;
