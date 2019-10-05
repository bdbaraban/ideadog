import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  DELETE_IDEA_FAILURE,
  DELETE_IDEA_SUCCESS,
  deleteIdea,
  FETCH_IDEA_FAILURE,
  FETCH_IDEA_SUCCESS,
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS,
  fetchIdea,
  fetchIdeas,
  fetchUserIdeas,
  initialIdeasState,
  POST_IDEA_FAILURE,
  POST_IDEA_SUCCESS,
  postIdea
} from 'store/ideas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock API response with idea
const mockResult = {
  body: [
    {
      id: 'ideas/2322859',
      key: '2322859',
      text: 'A dog hotel, for humans!',
      owner: { id: '1580680', username: 'DummyDog' },
      upvotes: 1,
      downvotes: 0,
      date: 1,
      tags: ['animals', 'business']
    }
  ],
  headers: { 'content-type': 'application/json' }
};

// Mock empty API response
const mockEmpty = {
  body: [],
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

describe('fetchIdeas', (): void => {
  test('creates FETCH_IDEAS_SUCCESS after fetching ideas', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(/ideas/);
    fetchMock.getOnce(queryRegex, mockResult);

    await store.dispatch(fetchIdeas() as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_IDEAS_SUCCESS,
        payload: mockResult.body
      }
    ]);
  });

  test('creates FETCH_IDEAS_FAILURE upon failure to fetch ideas', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(/ideas/);
    fetchMock.getOnce(queryRegex, mockError);

    await store.dispatch(fetchIdeas() as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_IDEAS_FAILURE,
        payload: 'Could not fetch ideas - please try again later.'
      }
    ]);
  });

  test('handles query parameters', async (): Promise<void> => {
    const store = mockStore(initialIdeasState);

    // `all` sort
    let queryRegex = new RegExp(/ideas/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('all') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();

    // `bright` sort
    queryRegex = new RegExp(/ideas\/bright/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('bright') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();

    // `all` sort & `dogs` search
    queryRegex = new RegExp(/ideas\?q=dogs/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('all', 'dogs') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();

    // `bright` sort & `dogs` search
    queryRegex = new RegExp(/ideas\/bright\?q=dogs/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('bright', 'dogs') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();

    // `all` sort & `animals` tags
    queryRegex = new RegExp(/ideas\?tags=animals/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('all', '', 'animals') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();

    // `bright` sort & `animals` tags
    queryRegex = new RegExp(/ideas\/bright\?tags=animals/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('bright', '', 'animals') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();

    // `all` sort & `dogs` search & `animals` tags
    queryRegex = new RegExp(/ideas\?q=dogs&tags=animals/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('all', 'dogs', 'animals') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();

    // `bright` sort & `dogs` search & `animals` tags
    queryRegex = new RegExp(/ideas\/bright\?q=dogs&tags=animals/);
    fetchMock.getOnce(queryRegex, mockResult);
    await store.dispatch(fetchIdeas('bright', 'dogs', 'animals') as any);
    expect(fetchMock.called(queryRegex)).toBeTruthy();
  });
});

describe('fetchIdea', (): void => {
  test('creates FETCH_IDEA_SUCCESS after fetching single idea', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`idea/${mockResult.body[0].key}`);
    fetchMock.getOnce(queryRegex, mockResult);

    await store.dispatch(fetchIdea(mockResult.body[0].key) as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_IDEA_SUCCESS,
        payload: mockResult.body
      }
    ]);
  });

  test('creates FETCH_IDEA_FAILURE upon failing to fetch single idea', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`idea/${mockResult.body[0].key}`);
    fetchMock.getOnce(queryRegex, mockError);

    await store.dispatch(fetchIdea(mockResult.body[0].key) as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_IDEA_FAILURE,
        payload: `Idea with ID ${mockResult.body[0].key} does not exist.`
      }
    ]);
  });

  test('creates FETCH_IDEA_FAILURE upon fetching nothing for a single idea', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`idea/${mockResult.body[0].key}`);
    fetchMock.getOnce(queryRegex, mockEmpty);

    await store.dispatch(fetchIdea(mockResult.body[0].key) as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_IDEA_FAILURE,
        payload: `Idea with ID ${mockResult.body[0].key} does not exist.`
      }
    ]);
  });
});

describe('fetchUserIdeas', (): void => {
  test('creates FETCH_USER_IDEAS_SUCCESS after fetching user ideas', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`user/${mockResult.body[0].owner.id}/ideas`);
    fetchMock.getOnce(queryRegex, mockResult);

    await store.dispatch(fetchUserIdeas(mockResult.body[0].owner.id) as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_USER_IDEAS_SUCCESS,
        payload: mockResult.body
      }
    ]);
  });

  test('creates FETCH_USER_IDEAS_FAILURE upon failing to fetch user ideas', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`user/${mockResult.body[0].owner.id}/ideas`);
    fetchMock.getOnce(queryRegex, mockError);

    await store.dispatch(fetchUserIdeas(mockResult.body[0].owner.id) as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_USER_IDEAS_FAILURE,
        payload: `User with ID ${mockResult.body[0].owner.id} does not exist.`
      }
    ]);
  });

  test('creates FETCH_USER_IDEAS_FAILURE upon fetching nothing for user ideas', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`user/${mockResult.body[0].owner.id}/ideas`);
    fetchMock.getOnce(queryRegex, mockEmpty);

    await store.dispatch(fetchUserIdeas(mockResult.body[0].owner.id) as any);

    expect(store.getActions()).toEqual([
      {
        type: FETCH_USER_IDEAS_FAILURE,
        payload: `User with ID ${mockResult.body[0].owner.id} does not exist.`
      }
    ]);
  });
});

describe('postIdea', (): void => {
  const idea = {
    text: 'Test idea',
    owner_id: '1234',
    tags: ['animals', 'architecture']
  };

  test('creates POST_IDEA_SUCCESS after posting an idea', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp('idea');
    fetchMock.postOnce(queryRegex, { status: 200 });

    await store.dispatch(postIdea(
      idea.text,
      idea.owner_id,
      idea.tags,
      'bearer'
    ) as any);

    expect(store.getActions()).toEqual([
      {
        type: POST_IDEA_SUCCESS,
        payload: 'Idea posted! 🙌'
      }
    ]);
  });

  test('creates POST_IDEA_FAILURE upon failing to post idea', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp('idea');
    fetchMock.postOnce(queryRegex, { status: 400 });

    await store.dispatch(postIdea(
      idea.text,
      idea.owner_id,
      idea.tags,
      'bearer'
    ) as any);

    expect(store.getActions()).toEqual([
      {
        type: POST_IDEA_FAILURE,
        payload: 'Failed to post idea.'
      }
    ]);
  });
});

describe('deleteIdea', (): void => {
  test('creates DELETE_IDEA_SUCCESS after deleting an idea', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`idea/${mockResult.body[0].key}`);
    fetchMock.deleteOnce(queryRegex, { status: 200 });

    await store.dispatch(deleteIdea(mockResult.body[0].key, 'bearer') as any);

    expect(store.getActions()).toEqual([
      {
        type: DELETE_IDEA_SUCCESS,
        payload: mockResult.body[0].key
      }
    ]);
  });

  test('creates DELETE_IDEA_FAILURE upon failing to delete idea', async (): Promise<
    void
  > => {
    const store = mockStore(initialIdeasState);

    const queryRegex = new RegExp(`idea/${mockResult.body[0].key}`);
    fetchMock.deleteOnce(queryRegex, { status: 400 });

    await store.dispatch(deleteIdea(mockResult.body[0].key, 'bearer') as any);

    expect(store.getActions()).toEqual([
      {
        type: DELETE_IDEA_FAILURE,
        payload: `Failed to delete ID with key ${mockResult.body[0].key}.`
      }
    ]);
  });
});
