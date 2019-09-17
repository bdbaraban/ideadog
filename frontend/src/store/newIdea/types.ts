// Reducer state
export interface NewIdeaState {
  open: boolean;
}

// Action types
export const SET_OPEN = 'store/newIdea/SET_OPEN';
export const SET_CLOSED = 'store/newIdea/SET_CLOSED';

interface SetOpen {
  type: typeof SET_OPEN;
}

interface SetClosed {
  type: typeof SET_CLOSED;
}

export type NewIdeaActionTypes = SetOpen | SetClosed;
