import { NotFoundError } from 'navi';
import { Idea } from '../types';

/**
 * getIdeas parameter types
 */
interface SearchParameters {
  // Ideas filter
  sort: string;

  // String of tags to filter ideas with
  tags: string;
}

/**
 * Gets ideas from the IdeaDog API with sort and tags filters
 */
const getIdeas = async ({ sort, tags }: SearchParameters): Promise<Idea[]> => {
  let query: string;
  if (sort === 'home') {
    switch (tags) {
      case undefined:
        query = `/api/ideas`;
        break;
      default:
        query = `/api/ideas?tags=${tags}`;
    }
  } else if (sort === 'bright') {
    switch (tags) {
      case undefined:
        query = `/api/ideas/${sort}`;
        break;
      default:
        query = `/api/ideas/${sort}?tags=${tags}`;
    }
  } else {
    throw new NotFoundError(`Sorting filter '${sort}' does not exist.`);
  }

  const response = await fetch(query);
  const data = await response.json();

  if (!data) {
    throw new NotFoundError(`Filed to find ideas on route /${sort}`);
  }
  return data;
};

export default getIdeas;
