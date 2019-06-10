import { Idea } from './';
import { NotFoundError } from 'navi';

interface SearchParameters {
  sort: string;
  tags: string;
}

const getIdeas = async ({ sort, tags }: SearchParameters): Promise<Idea[]> => {
  let query: string;
  if (sort === 'home') {
    switch (tags) {
      case undefined:
        query = 'http://localhost:5000/api/ideas';
        break;
      default:
        query = `http://localhost:5000/api/ideas?tags=${tags}`;
    }
  } else if (sort === 'bright') {
    switch (tags) {
      case undefined:
        query = `http://localhost:5000/api/ideas/${sort}`;
        break;
      default:
        query = `http://localhost:5000/api/ideas/${sort}?tags=${tags}`;
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
