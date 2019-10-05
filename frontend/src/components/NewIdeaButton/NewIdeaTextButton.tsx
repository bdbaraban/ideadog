import React, { FC } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// NewIdeaTextButton component styles
const useStyles = makeStyles(() =>
  createStyles({
    box: {
      textAlign: 'center',
      width: '100%'
    }
  })
);

// NewIdeaTextButton component prop types
interface NewIdeaTextButtonProps {
  handleClick: VoidFunction;
}

/**
 * 'New Idea' text button for opening/closing NewIdeaDialog, displayed on desktop
 */
const NewIdeaTextButton: FC<NewIdeaTextButtonProps> = ({
  handleClick
}: NewIdeaTextButtonProps) => {
  // Select Material-Ui styles
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Fab
        color="secondary"
        variant="extended"
        size="medium"
        aria-label="add"
        onClick={handleClick}
      >
        <AddIcon />
        New Idea
      </Fab>
    </Box>
  );
};

export default NewIdeaTextButton;
