import { NotFoundError } from 'navi';
import { API } from '../constants';
import { Idea } from '../types';

/**
 * Fetch all ideas posted by a given user from the IdeaDog API.
 * @param key {string} - Key of the user to fetch ideas from.
 */
const getUserIdeas = async (key: string): Promise<Idea[]> => {
  const response = await fetch(`${API}/user/${key}/ideas`);
  const data: Idea[] = await response.json();

  if (!data) {
    throw new NotFoundError(`Could not find ideas for user with ID ${key}.`);
  }
  return data;
};

export default getUserIdeas;
