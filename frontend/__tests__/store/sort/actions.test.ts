import configureMockStore from 'redux-mock-store';

import { initialSortState, SET_SORT, setSort } from 'store/sort';

const mockStore = configureMockStore();

describe('setSort', (): void => {
  test('creates SET_SORT', (): void => {
    const store = mockStore(initialSortState);

    store.dispatch(
      setSort({
        key: 'bright',
        icon: 'brightness_5'
      })
    );

    expect(store.getActions()).toEqual([
      {
        type: SET_SORT,
        payload: {
          key: 'bright',
          icon: 'brightness_5'
        }
      }
    ]);
  });
});
