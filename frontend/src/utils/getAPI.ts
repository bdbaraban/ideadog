/**
 * Fetch the current API hostname
 */
const getAPI = (): string => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://ideadog.site/api';
};

export default getAPI;
