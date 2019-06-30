import { API } from '../constants';
import { Tag } from '../types';

/**
 * Fetch all available tags from the IdeaDog API.
 */
export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch(`${API}/tags`);
  const data = await response.json();

  if (!data) {
    throw new Error('Failed to fetch tags.');
  }
  return Object.values(data);
};
