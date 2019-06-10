import { Idea } from './';
import { NotFoundError } from 'navi';

interface SearchParameters {
  key: string;
}

const getIdea = async ({ key }: SearchParameters): Promise<Idea[]> => {
  const response = await fetch(`http://localhost:5000/api/idea/${key}`);
  const data: Idea[] = await response.json();

  if (!data) {
    throw new NotFoundError(`Idea with ID '${key}' does not exist.`);
  }
  return data;
};

export default getIdea;
