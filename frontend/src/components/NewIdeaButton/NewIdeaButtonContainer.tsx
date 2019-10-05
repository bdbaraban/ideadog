import React, { FC } from 'react';

import Hidden from '@material-ui/core/Hidden';

import NewIdeaIconButton from './NewIdeaIconButton';
import NewIdeaTextButton from './NewIdeaTextButton';

import { useDispatch } from 'react-redux';
import { setClosed, setOpen } from 'store/newIdea';

import { useNewIdeaState } from 'hooks';

/**
 * Wraps responsive button for posting new ideas
 */
const NewIdeaButtonContainer: FC<{}> = () => {
  // Load Redux dispatcher
  const dispatch = useDispatch();

  // Select new idea state from Redux store
  const { open } = useNewIdeaState();

  // Toggle new idea dialog open/closed
  const toggleOpen = (): void => {
    if (!open) {
      dispatch(setOpen());
    } else {
      dispatch(setClosed());
    }
  };

  return (
    <>
      <Hidden xsDown implementation="css">
        <NewIdeaTextButton handleClick={toggleOpen} />
      </Hidden>
      <Hidden smUp implementation="css">
        <NewIdeaIconButton handleClick={toggleOpen} />
      </Hidden>
    </>
  );
};

export default NewIdeaButtonContainer;
