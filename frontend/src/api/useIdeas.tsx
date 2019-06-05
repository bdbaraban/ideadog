export interface Idea {
  id: number;
  username: string;
  text: string;
  tags: string[];
  createdAt: Date;
  upvotes: number;
  downvotes: number;
}

interface UseIdeasProps {
  filter: string;
  currentTags: string[];
}

const useIdeas = ({ filter, currentTags }: UseIdeasProps): Idea[] => {
  return [
    {
      id: 1,
      username: 'bdov_',
      text: 'A line of contact lenses, but for dogs.',
      tags: ['Business'],
      createdAt: new Date(),
      upvotes: 27,
      downvotes: 4
    },
    {
      id: 2,
      username: 'bdbaraban',
      text: 'An airline, exclusively for dogs.',
      tags: ['Business', 'Animals'],
      createdAt: new Date(),
      upvotes: 28,
      downvotes: 16
    },
    {
      id: 3,
      username: 'bdawg15',
      text: 'A bar filled - I mean filled - with dogs.',
      tags: ['Business', 'Food'],
      createdAt: new Date(),
      upvotes: 29,
      downvotes: 44
    }
  ];
};

export default useIdeas;
