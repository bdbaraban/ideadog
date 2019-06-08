import { Tag } from './';

const getTags = async (): Promise<Tag[]> => {
  const response = await fetch('http://localhost:5000/api/tags');
  const data = await response.json();
  return Object.values(data);
};

export default getTags;
