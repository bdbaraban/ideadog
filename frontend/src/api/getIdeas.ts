import { Idea } from './';

interface SearchParameters {
  sort: string;
  currentTags: string[];
}

const getIdeas = async ({
  sort,
  currentTags
}: SearchParameters): Promise<Idea[]> => {
  const response = await fetch(
    sort === 'all'
      ? 'http://localhost:5000/api/ideas'
      : `http://localhost:5000/api/ideas/${sort}`
  );
  const data = await response.json();
  return data;
};

export default getIdeas;
