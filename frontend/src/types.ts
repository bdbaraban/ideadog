/**
 * Idea type
 */
export interface Idea {
  id: string; // ID (idea/${key})
  key: string; // Key
  owner: {
    id: string; // User ID (user/${key})
    username: string; // Username
  };
  date: number; // Date of creation
  text: string; // Content
  tags: string[]; // Associated tags
  upvotes: number; // Upvote count
  downvotes: number; // Downvote count
}

/**
 * Tag type
 */
export interface Tag {
  id: string; // ID (tag/${key})
  key: string; // Key
  count: number; // Count of ideas associated with tag
}

/**
 * User type
 */
export interface User {
  id: string; // ID (user/${key})
  key: string; // Key
  username: string; // Username
  email: string; // Email address
  ideas: { [key: string]: boolean }; // Object of ID's of ideas posted by user
  favorite: string; // User's top-used tag
  upvotes: number; // Total upvote count on all of user's ideas
  downvotes: number; // Total downvote count on all of user's ideas
  active: boolean; // Account status
  created_at: number; // Date of account creation
  votes: { [key: string]: string } | null; // Object of ideas user has voted on
}
