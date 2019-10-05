import ideasReducer, {
  DELETE_IDEA_FAILURE,
  DELETE_IDEA_SUCCESS,
  initialIdeasState,
  FETCH_IDEA_FAILURE,
  FETCH_IDEA_SUCCESS,
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_SUCCESS,
  FETCH_USER_IDEAS_FAILURE,
  FETCH_USER_IDEAS_SUCCESS,
  POST_IDEA_FAILURE,
  POST_IDEA_SUCCESS
} from 'store/ideas';

// Mock ideas action payload
const mockPayload = [
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
];

describe('ideas reducer', (): void => {
  test('handles FETCH_IDEAS_SUCCESS', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: FETCH_IDEAS_SUCCESS,
      payload: mockPayload
    });

    expect(reducedState).toEqual({
      all: mockPayload,
      status: 'No bamboozle, there are no more ideas.',
      message: ''
    });
  });

  test('handles FETCH_IDEAS_FAILURE', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: FETCH_IDEAS_FAILURE,
      payload: 'fetch ideas error'
    });

    expect(reducedState).toEqual({
      all: [],
      status: 'fetch ideas error',
      message: ''
    });
  });

  test('handles FETCH_IDEA_SUCCESS', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: FETCH_IDEA_SUCCESS,
      payload: mockPayload
    });

    expect(reducedState).toEqual({
      all: mockPayload,
      status: 'No bamboozle, there are no more ideas.',
      message: ''
    });
  });

  test('handles FETCH_IDEA_FAILURE', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: FETCH_IDEA_FAILURE,
      payload: 'fetch idea error'
    });

    expect(reducedState).toEqual({
      all: [],
      status: 'fetch idea error',
      message: ''
    });
  });

  test('handles FETCH_USER_IDEAS_SUCCESS', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: FETCH_USER_IDEAS_SUCCESS,
      payload: mockPayload
    });

    expect(reducedState).toEqual({
      all: mockPayload,
      status: 'No bamboozle, there are no more ideas.',
      message: ''
    });
  });

  test('handles FETCH_USER_IDEAS_FAILURE', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: FETCH_USER_IDEAS_FAILURE,
      payload: 'fetch user ideas error'
    });

    expect(reducedState).toEqual({
      all: [],
      status: 'fetch user ideas error',
      message: ''
    });
  });

  test('handles POST_IDEA_SUCCESS', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: POST_IDEA_SUCCESS,
      payload: 'Idea posted! 🙌'
    });

    expect(reducedState).toEqual({
      all: [],
      status: 'No bamboozle, there are no more ideas.',
      message: 'Idea posted! 🙌'
    });
  });

  test('handles POST_IDEA_FAILURE', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: POST_IDEA_FAILURE,
      payload: 'Failed to post idea.'
    });

    expect(reducedState).toEqual({
      all: [],
      status: 'No bamboozle, there are no more ideas.',
      message: 'Failed to post idea.'
    });
  });

  test('handles DELETE_IDEA_SUCCESS', (): void => {
    const reducedState = ideasReducer(
      {
        ...initialIdeasState,
        all: mockPayload
      },
      {
        type: DELETE_IDEA_SUCCESS,
        payload: mockPayload[0].key
      }
    );

    expect(reducedState).toEqual({
      all: [],
      status: 'No bamboozle, there are no more ideas.',
      message: 'Idea deleted 🗑️.'
    });
  });

  test('handles DELETE_IDEA_FAILURE', (): void => {
    const reducedState = ideasReducer(initialIdeasState, {
      type: DELETE_IDEA_FAILURE,
      payload: 'delete idea error'
    });

    expect(reducedState).toEqual({
      all: [],
      status: 'No bamboozle, there are no more ideas.',
      message: 'delete idea error'
    });
  });
});
