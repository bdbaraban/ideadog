/**
 * Idea type
 */
export interface Idea {
  // ID (idea/${key})
  id: string;

  // Key
  key: string;

  // User owner
  owner: {
    // ID (user/${key})
    id: string;

    // Key
    key: string;

    // Username
    name: string;
  };

  // Date of creation
  date: number;

  // Content
  text: string;

  // Associated tags
  tags: string[];

  // Upvote count
  upvotes: number;

  // Downvote count
  downvotes: number;
}

/**
 * Tag type
 */
export interface Tag {
  // ID (tag/${key})
  id: string;

  // Key
  key: string;

  // Count of ideas associated with tag
  count: number;
}

/**
 * User type
 */
export interface User {
  // ID (user/${key})
  id: string;

  // Key
  key: string;

  // Username
  username: string;

  // Email address
  email: string;

  // Array of ID's of ideas posted by user
  ideas: string[];

  // User's top-used tag
  favorite: string;

  // Total upvote count on all of user's ideas
  upvotes: number;

  // Total downvote count on all of user's ideas
  downvotes: number;

  // Account status
  active: boolean;

  // Date of account creation
  created_at: number;
}

/**
 * CheckboxTag type, used by tag-filtering components
 */
export interface CheckboxTag {
  // Tag name
  [key: string]: {
    // Total count of ideas associated with tag
    count: number;

    // Tag filter's checked status
    checked: boolean;
  };
}

/**
 * Generic void function type
 */
export type VoidFunction = () => void;
