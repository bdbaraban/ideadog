const isomorphicUnfetch = jest.requireActual('isomorphic-unfetch');
const fetchMock = require('fetch-mock').sandbox();

module.exports = Object.assign(fetchMock.config, isomorphicUnfetch, {
  fetch: isomorphicUnfetch
});
