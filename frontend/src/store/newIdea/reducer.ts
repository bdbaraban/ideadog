import {
  NewIdeaActionTypes,
  NewIdeaState,
  SET_OPEN
} from 'store/newIdea/types';

// Initial new idea state
export const initialNewIdeaState: NewIdeaState = {
  open: false
};

/**
 * Reduce an action into a new new idea state.
 * @param state - Current new idea state.
 * @param action - Redux action to reduce.
 */
const newIdeaReducer = (
  state: NewIdeaState = initialNewIdeaState,
  action: NewIdeaActionTypes
): NewIdeaState => {
  switch (action.type) {
    case SET_OPEN:
      return {
        open: action.payload
      };

    default:
      return state;
  }
};

export default newIdeaReducer;
