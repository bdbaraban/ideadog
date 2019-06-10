export interface Idea {
  id: string;
  key: string;
  owner: {
    id: string;
    key: string;
    name: string;
  };
  date: number;
  text: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
}

export interface Tag {
  id: string;
  key: string;
  count: number;
}

export interface User {
  id: string;
  key: string;
  username: string;
  email: string;
  ideas: string[];
  favorite: string;
  upvotes: number;
  downvotes: number;
  active: boolean;
  created_at: number;
}
