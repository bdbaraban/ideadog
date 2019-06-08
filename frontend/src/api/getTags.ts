import { Tag } from './';

const getTags = async (): Promise<Tag[]> => {
  /* API fetch
  const response = await fetch(`/api/tags`);
  const data = await response.json();
  return Object.values(data);
  */

  return [
    {
      id: '/tags/1',
      key: '1',
      name: 'Business',
      count: 7
    },
    {
      id: '/tags/2',
      key: '2',
      name: 'Programming',
      count: 19
    },
    {
      id: '/tags/3',
      key: '3',
      name: 'Science',
      count: 21
    },
    {
      id: '/tags/4',
      key: '4',
      name: 'Exercise',
      count: 8
    },
    {
      id: '/tags/5',
      key: '5',
      name: 'Writing',
      count: 10
    },
    {
      id: '/tags/6',
      key: '6',
      name: 'Sports',
      count: 1
    },
    {
      id: '/tags/7',
      key: '7',
      name: 'Architecture',
      count: 11
    },
    {
      id: '/tags/8',
      key: '8',
      name: 'Animals',
      count: 99
    }
  ];
};

export default getTags;
