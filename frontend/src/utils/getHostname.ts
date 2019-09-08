/**
 * Fetch the current hostname
 */
const getHostname = (): string => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:1234'
    : 'https://ideadog.site';
};

export default getHostname;
