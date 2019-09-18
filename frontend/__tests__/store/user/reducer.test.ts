import userReducer, {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  initialUserState
} from 'store/user';

// Mock tags action payload
const mockPayload = {
  key: '1580680',
  id: 'users/1580680',
  username: 'DummyDog',
  email: 'dummy_dog@ideadog.com',
  ideas: { '1580628': true, '2272931': true, '2322859': true },
  active: false,
  favorite: 'Fashion',
  upvotes: 2,
  downvotes: 1,
  votes: null,
  created_at: 1563051305478
};

describe('user reducer', (): void => {
  test('handles FETCH_USER_SUCCESS', (): void => {
    const reducedState = userReducer(initialUserState, {
      type: FETCH_USER_SUCCESS,
      payload: {
        profile: mockPayload,
        bearer: 'bearer'
      }
    });

    expect(reducedState).toEqual({
      profile: mockPayload,
      bearer: 'bearer',
      isAuthenticated: true
    });
  });

  test('handles FETCH_USER_FAILURE', (): void => {
    const reducedState = userReducer(initialUserState, {
      type: FETCH_USER_FAILURE
    });

    expect(reducedState).toEqual({
      profile: {
        id: '',
        key: '',
        username: '',
        email: '',
        ideas: {},
        favorite: '',
        upvotes: 0,
        downvotes: 0,
        active: false,
        created_at: 0,
        votes: {}
      },
      bearer: '',
      isAuthenticated: false
    });
  });
});
