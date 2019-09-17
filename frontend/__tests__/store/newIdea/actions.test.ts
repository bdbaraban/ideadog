import configureMockStore from 'redux-mock-store';

import { SET_CLOSED, SET_OPEN, setClosed, setOpen } from 'store/newIdea';

const mockStore = configureMockStore();

describe('setOpen', (): void => {
  test('creates SET_OPEN', (): void => {
    const store = mockStore({ open: false });

    store.dispatch(setOpen());

    expect(store.getActions()).toEqual([
      {
        type: SET_OPEN
      }
    ]);
  });
});

describe('setClosed', (): void => {
  test('creates SET_CLOSED', (): void => {
    const store = mockStore({ open: false });

    store.dispatch(setClosed());

    expect(store.getActions()).toEqual([
      {
        type: SET_CLOSED
      }
    ]);
  });
});
