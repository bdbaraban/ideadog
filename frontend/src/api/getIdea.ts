import { NotFoundError } from 'navi';
import { Idea } from '../types';

/**
 * getIdea parameter types
 */
interface SearchParameters {
  // The key of the ID to get
  key: string;
}

/**
 * Fetches a single ID from the IdeaDog API
 */
const getIdea = async ({ key }: SearchParameters): Promise<Idea> => {
  const response = await fetch(`http://localhost:5000/api/idea/${key}`);
  const data: Idea[] = await response.json();

  if (!data) {
    throw new NotFoundError(`Idea with ID '${key}' does not exist.`);
  }
  return data[0];
};

export default getIdea;
