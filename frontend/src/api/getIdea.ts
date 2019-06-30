import { NotFoundError } from 'navi';
import { API } from '../constants';
import { Idea } from '../types';

/**
 * Fetch a single idea from the IdeaDog API.
 * @param key {string} - The ID of the idea to fetch.
 */
const getIdea = async (key: string): Promise<Idea> => {
  const response = await fetch(`${API}/idea/${key}`);
  const data: Idea[] = await response.json();

  if (!data) {
    throw new NotFoundError(`Could not find idea with ID '${key}'.`);
  }
  return data[0];
};

export default getIdea;
