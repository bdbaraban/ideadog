import configureMockStore from 'redux-mock-store';

import { initialSearchState, SET_SEARCH, setSearch } from 'store/search';

const mockStore = configureMockStore();

describe('setSearch', (): void => {
  test('creates SET_SEARCH', (): void => {
    const store = mockStore(initialSearchState);

    store.dispatch(setSearch('dogs'));

    expect(store.getActions()).toEqual([
      {
        type: SET_SEARCH,
        payload: 'dogs'
      }
    ]);
  });
});
