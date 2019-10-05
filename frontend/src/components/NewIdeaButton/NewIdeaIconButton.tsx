import React, { FC } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// NewIdeaIconButton component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      marginBottom: theme.spacing(2)
    }
  })
);

// NewIdeaIconButton component prop types
interface NewIdeaIconButtonProps {
  handleClick: VoidFunction;
}

/**
 * Icon button for opening/closing NewIdeaDialog
 */
const NewIdeaIconButton: FC<NewIdeaIconButtonProps> = ({
  handleClick
}: NewIdeaIconButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Box className={classes.fab}>
      <Fab
        color="secondary"
        size="small"
        aria-label="add"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default NewIdeaIconButton;
