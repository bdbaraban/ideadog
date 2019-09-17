import { NewIdeaActionTypes, SET_CLOSED, SET_OPEN } from './types';

/**
 * Open the NewIdeaDialog.
 */
export const setOpen = (): NewIdeaActionTypes => {
  return {
    type: SET_OPEN
  };
};

/**
 * Close the NewIdeaDialog.
 */
export const setClosed = (): NewIdeaActionTypes => {
  return {
    type: SET_CLOSED
  };
};
