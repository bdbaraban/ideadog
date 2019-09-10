import { NewIdeaActionTypes, SET_OPEN } from 'store/newIdea/types';

/**
 * Set the open/closed status of the NewIdeaDialog
 */
export const setOpen = (open: boolean): NewIdeaActionTypes => {
  return {
    type: SET_OPEN,
    payload: open
  };
};
