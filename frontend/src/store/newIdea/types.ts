// Reducer state
export interface NewIdeaState {
  open: boolean;
}

// Action types
export const SET_OPEN = 'SET_OPEN';

interface SetOpen {
  type: typeof SET_OPEN;
  payload: boolean;
}

export type NewIdeaActionTypes = SetOpen;
