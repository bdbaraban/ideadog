import { NotFoundError } from 'navi';
import { API } from '../constants';
import { Idea } from '../types';

/**
 * Fetch a single idea from the IdeaDog API.
 * @param key {string} - The ID of the idea to fetch.
 */
export const getIdea = async (key: string): Promise<Idea> => {
  const response = await fetch(`${API}/idea/${key}`);
  const data: Idea[] = await response.json();

  if (!data) {
    throw new NotFoundError(`Could not find idea with ID '${key}'.`);
  }
  return data[0];
};

/**
 * Gets ideas from the IdeaDog API with sort and tags filters
 * @param sort {string} - The sort filter.
 * @param tags {string} - String of comma-separated tag filters.
 * @param search {string} - Search query.
 */
export const getIdeas = async (
  sort: string,
  tags: string | undefined,
  search: string | undefined
): Promise<Idea[]> => {
  if (!['home', 'bright'].includes(sort)) {
    throw new NotFoundError(`Sorting filter '${sort}' does not exist.`);
  }

  let query: string = `${API}/ideas`;
  if (sort !== 'home') {
    query += `/${sort}`;
  }
  if (tags) {
    query += `?tags=${tags}`;
  }
  if (search) {
    query += tags !== undefined ? `&q=${search}` : `?q=${search}`;
  }

  const response = await fetch(query);
  const data = await response.json();

  if (!data) {
    throw new Error(`Failed to find ideas on route /${sort}.`);
  }
  return data;
};

/**
 * Post a new idea.
 * @param bearer {string} - Current logged-in user's bearer token.
 * @param text {string} - Text of the new idea.
 * @param owner_id {string} - Current logged in user's ID.
 * @param tags {array} - Tags of the new idea, an array of strings.
 */
export const postIdea = async (
  bearer: string,
  text: string,
  owner_id: string,
  tags: string[]
): Promise<void> => {
  fetch(`${API}/idea`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearer
    },
    body: JSON.stringify({
      text,
      owner_id,
      tags: tags.map((tag: string): string => tag.toLowerCase())
    })
  });
};

/**
 * Delete an idea.
 * @param key {string} - Key of the idea to delete.
 * @param bearer {string} - Current logged-in user's bearer token.
 */
export const deleteIdea = async (
  key: string,
  bearer: string
): Promise<void> => {
  fetch(`${API}/idea/${key}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearer}`
    }
  });
};

/**
 * Upvote an idea.
 * @param key {string} - Key of the idea to upvote.
 * @param bearer {string} - Current logged-in user's bearer token.
 */
export const upvoteIdea = async (
  key: string,
  bearer: string
): Promise<void> => {
  fetch(`${API}/idea/${key}/upvote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  });
};

/**
 * Downvote an idea.
 * @param key {string} - Key of the idea to downvote.
 * @param bearer {string} - Current logged-in user's bearer token.
 */
export const downvoteIdea = async (
  key: string,
  bearer: string
): Promise<void> => {
  fetch(`${API}/idea/${key}/downvote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  });
};
