import { Tag } from '../types';
import { API } from '../constants';

/**
 * Fetches all available tags from the IdeaDog API.
 */
const getTags = async (): Promise<Tag[]> => {
  const response = await fetch(`http://${API}/api/tags`);
  const data = await response.json();

  if (!data) {
    throw new Error();
  }
  return Object.values(data);
};

export default getTags;
