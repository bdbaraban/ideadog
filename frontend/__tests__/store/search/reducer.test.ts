import searchReducer, { initialSearchState, SET_SEARCH } from 'store/search';

describe('search reducer', (): void => {
  test('handles SET_SEARCH', (): void => {
    const reducedState = searchReducer(initialSearchState, {
      type: SET_SEARCH,
      payload: 'dogs'
    });

    expect(reducedState).toEqual({
      query: 'dogs'
    });
  });
});
