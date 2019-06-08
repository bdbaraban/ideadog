import { Idea } from './';

interface SearchParameters {
  key: string;
}

const getIdea = async ({ key }: SearchParameters): Promise<Idea[]> => {
  const response = await fetch(`http://localhost:5000/api/idea/${key}`);
  const data = await response.json();
  return data;
};

export default getIdea;
