import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  fetchUser,
  initialUserState
} from 'store/user';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock API response with user
const mockResult = {
  body: {
    key: '1580680',
    id: 'users/1580680',
    username: 'DummyDog',
    email: 'dummy_dog@ideadog.com',
    ideas: { '1580628': 'true', '2272931': 'true', '2322859': 'true' },
    active: false,
    favorite: 'Fashion',
    upvotes: 2,
    downvotes: 1,
    votes: null,
    created_at: 1563051305478
  },
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

describe('fetchUser', (): void => {
  test('creates FETCH_USER_SUCCESS after fetching user', async (): Promise<
    void
  > => {
    const store = mockStore(initialUserState);

    const queryRegex = new RegExp(/user/);
    fetchMock.getOnce(queryRegex, mockResult);

    await store.dispatch(fetchUser('bearer') as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_USER_SUCCESS,
        payload: {
          profile: mockResult.body,
          bearer: 'bearer'
        }
      }
    ]);
  });

  test('creates FETCH_USER_FAILURE upon failure to fetch user', async (): Promise<
    void
  > => {
    const store = mockStore(initialUserState);

    const queryRegex = new RegExp(/user/);
    fetchMock.getOnce(queryRegex, mockError);

    await store.dispatch(fetchUser('bearer') as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_USER_FAILURE
      }
    ]);
  });
});
