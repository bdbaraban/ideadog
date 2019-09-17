import ideasReducer, {
  initialNewIdeaState,
  SET_CLOSED,
  SET_OPEN
} from 'store/newIdea';

describe('new idea reducer', () => {
  test('handles SET_OPEN', (): void => {
    expect(
      ideasReducer(initialNewIdeaState, {
        type: SET_OPEN
      })
    ).toEqual({
      open: true
    });
  });

  test('handles SET_CLOSED', (): void => {
    expect(
      ideasReducer(initialNewIdeaState, {
        type: SET_CLOSED
      })
    ).toEqual({
      open: false
    });
  });
});
