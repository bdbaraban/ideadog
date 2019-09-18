import newIdeaReducer, {
  initialNewIdeaState,
  SET_CLOSED,
  SET_OPEN
} from 'store/newIdea';

describe('new idea reducer', (): void => {
  test('handles SET_OPEN', (): void => {
    const reducedState = newIdeaReducer(initialNewIdeaState, {
      type: SET_OPEN
    });

    expect(reducedState).toEqual({
      open: true
    });
  });

  test('handles SET_CLOSED', (): void => {
    const reducedState = newIdeaReducer(initialNewIdeaState, {
      type: SET_CLOSED
    });

    expect(reducedState).toEqual({
      open: false
    });
  });
});
