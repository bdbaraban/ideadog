import { Tag } from '../types';

/**
 * Fetches all available tags from the IdeaDog API.
 */
const getTags = async (): Promise<Tag[]> => {
  const response = await fetch('http://localhost:5000/api/tags');
  const data = await response.json();

  if (!data) {
    throw new Error();
  }
  return Object.values(data);
};

export default getTags;
