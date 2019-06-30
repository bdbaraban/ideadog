import { NotFoundError } from 'navi';
import { API } from '../constants';
import { Idea, User } from '../types';

/**
 * Fetch a user from the IdeaDog API.
 * @param bearer {string} - Logged in user's bearer token (undefined if not fetching logged in user).
 */
export const getCurrentUser = async (
  bearer: string
): Promise<User> => {
  const response = await fetch(`${API}/user`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${bearer}`
    }
  });

  const data: User = await response.json();
  if (!data) {
    throw new Error(`Failed to fetch user profile.`);
    window.localStorage.clear();
  }
  return data;
};

/**
 * Fetch a user from the IdeaDog API.
 * @param key {string} - The ID of the user to fetch (undefined if fetching logged in user).
 */
export const getSingleUser = async (
  key: string | undefined = undefined,
): Promise<User> => {
  const response = await fetch(`${API}/user/${key}`, {
    method: 'GET',
    credentials: 'include'
  });

  const data: User = await response.json();
  if (!data) {
    throw new NotFoundError(`Could not find user with ID ${key}.`);
  }
  return data;
};

/**
 * Fetch all ideas posted by a given user from the IdeaDog API.
 * @param key {string} - Key of the user to fetch ideas from.
 */
export const getUserIdeas = async (key: string): Promise<Idea[]> => {
  const response = await fetch(`${API}/user/${key}/ideas`);
  const data: Idea[] = await response.json();

  if (!data) {
    throw new NotFoundError(`Could not find ideas for user with ID ${key}.`);
  }
  return data;
};
