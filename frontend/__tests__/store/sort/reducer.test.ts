import sortReducer, { initialSortState, SET_SORT } from 'store/sort';

describe('sort reducer', (): void => {
  test('handles SET_SORT', (): void => {
    const reducedState = sortReducer(initialSortState, {
      type: SET_SORT,
      payload: {
        key: 'bright',
        icon: 'brightness_5'
      }
    });

    expect(reducedState).toEqual({
      all: initialSortState.all,
      current: {
        key: 'bright',
        icon: 'brightness_5'
      }
    });
  });
});
