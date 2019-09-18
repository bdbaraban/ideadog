import tagsReducer, {
  ADD_SELECTED_TAG,
  FETCH_TAGS_FAILURE,
  FETCH_TAGS_SUCCESS,
  initialTagsState,
  REMOVE_SELECTED_TAG
} from 'store/tags';

// Mock tags action payload
const mockPayload = [
  { key: 'animals', id: 'tags/animals', count: 4, ideas: [] }
];

describe('tags reducer', (): void => {
  test('handles FETCH_TAGS_SUCCESS', (): void => {
    const reducedState = tagsReducer(initialTagsState, {
      type: FETCH_TAGS_SUCCESS,
      payload: mockPayload
    });

    expect(reducedState).toEqual({
      all: mockPayload,
      selected: {},
      status: 'OK'
    });
  });

  test('handles FETCH_TAGS_FAILURE', (): void => {
    const reducedState = tagsReducer(initialTagsState, {
      type: FETCH_TAGS_FAILURE,
      payload: 'fetch ideas error'
    });

    expect(reducedState).toEqual({
      all: [],
      selected: {},
      status: 'fetch ideas error'
    });
  });

  test('handles ADD_SELECTED_TAG and REMOVE_SELECTED_TAG', (): void => {
    let reducedState = tagsReducer(initialTagsState, {
      type: ADD_SELECTED_TAG,
      payload: 'animals'
    });

    expect(reducedState).toEqual({
      all: initialTagsState.all,
      selected: { animals: true },
      status: initialTagsState.status
    });

    reducedState = tagsReducer(reducedState, {
      type: REMOVE_SELECTED_TAG,
      payload: 'animals'
    });

    expect(reducedState).toEqual({
      all: initialTagsState.all,
      selected: {},
      status: initialTagsState.status
    });
  });
});
