import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  addSelectedTag,
  ADD_SELECTED_TAG,
  FETCH_TAGS_FAILURE,
  FETCH_TAGS_SUCCESS,
  fetchTags,
  initialTagsState,
  removeSelectedTag,
  REMOVE_SELECTED_TAG
} from 'store/tags';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock API response with tag
const mockResult = {
  body: [{ key: 'animals', id: 'tags/animals', count: 4, ideas: [] }],
  headers: { 'content-type': 'application/json' }
};

// Mock API error
const mockError = {
  body: null,
  headers: { 'content-type': 'application/json' }
};

// fetch-mock cleanup
afterEach((): void => {
  fetchMock.restore();
});

describe('fetchTags', (): void => {
  test('creates FETCH_TAGS_SUCCESS after fetching tags', async (): Promise<
    void
  > => {
    const store = mockStore(initialTagsState);

    const queryRegex = new RegExp(/tags/);
    fetchMock.getOnce(queryRegex, mockResult);

    await store.dispatch(fetchTags() as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_TAGS_SUCCESS,
        payload: mockResult.body
      }
    ]);
  });

  test('creates FETCH_TAGS_FAILURE upon failure to fetch ideas', async (): Promise<
    void
  > => {
    const store = mockStore(initialTagsState);

    const queryRegex = new RegExp(/tags/);
    fetchMock.getOnce(queryRegex, mockError);

    await store.dispatch(fetchTags() as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_TAGS_FAILURE,
        payload: 'Could not fetch tags - please try again later.'
      }
    ]);
  });
});

describe('addSelectedTag', (): void => {
  test('creates ADD_SELECTED_TAG', (): void => {
    const store = mockStore(initialTagsState);

    store.dispatch(addSelectedTag('animals'));

    expect(store.getActions()).toEqual([
      {
        type: ADD_SELECTED_TAG,
        payload: 'animals'
      }
    ]);
  });
});

describe('removeSelectedTag', (): void => {
  test('creates REMOVED_SELECTED_TAG', (): void => {
    const store = mockStore(initialTagsState);

    store.dispatch(removeSelectedTag('animals'));

    expect(store.getActions()).toEqual([
      {
        type: REMOVE_SELECTED_TAG,
        payload: 'animals'
      }
    ]);
  });
});
