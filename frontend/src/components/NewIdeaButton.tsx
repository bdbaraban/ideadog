import React, { ReactElement } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { NewIdeaState } from 'store/newIdea/types';
import { setOpen } from 'store/newIdea/actions';

/**
 * Button for posting new ideas
 */
const NewIdeaFab = (): ReactElement => {
  const dispatch = useThunkDispatch();

  // Select new idea state from Redux store
  const newIdea = useSelector((state: AppState): NewIdeaState => state.newIdea);

  // Toggle new idea dialog open/closed
  const toggleOpen = (): void => {
    dispatch(setOpen(!newIdea.open));
  };

  return (
    <>
      <Hidden xsDown>
        <Fab
          color="secondary"
          variant="extended"
          size="medium"
          aria-label="add"
          onClick={toggleOpen}
        >
          <AddIcon />
          New Idea
        </Fab>
      </Hidden>
      <Hidden smUp>
        <Fab
          color="secondary"
          size="small"
          aria-label="add"
          onClick={toggleOpen}
        >
          <AddIcon />
        </Fab>
      </Hidden>
    </>
  );
};

export default NewIdeaFab;
