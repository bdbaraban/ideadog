import { NotFoundError } from 'navi';
import { API } from '../constants';
import { Idea } from '../types';

/**
 * Gets ideas from the IdeaDog API with sort and tags filters
 * @param sort {string} - The sort filter.
 * @param tags {string} - String of comma-separated tag filters.
 * @param search {string} - Search query.
 */
const getIdeas = async (
  sort: string,
  tags: string | undefined,
  search: string | undefined
): Promise<Idea[]> => {
  if (!['home', 'bright'].includes(sort)) {
    throw new NotFoundError(`Sorting filter '${sort}' does not exist.`);
  }

  let query: string = `${API}/ideas`;
  if (sort !== 'home') {
    query += `/${sort}`;
  }
  if (tags) {
    query += `?tags=${tags}`;
  }
  if (search) {
    query += `?q=${search}`;
  }

  const response = await fetch(query);
  const data = await response.json();

  if (!data) {
    throw new Error(`Failed to find ideas on route /${sort}.`);
  }
  return data;
};

export default getIdeas;
