import React, { ReactElement } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';

/**
 * Button for posting new ideas
 */
const NewIdeaFab = (): ReactElement => {
  return (
    <>
      <Hidden xsDown>
        <Fab
          color="secondary"
          variant="extended"
          size="medium"
          aria-label="add"
        >
          <AddIcon />
          New Idea
        </Fab>
      </Hidden>
      <Hidden smUp>
        <Fab color="secondary" size="small" aria-label="add">
          <AddIcon />
        </Fab>
      </Hidden>
    </>
  );
};

export default NewIdeaFab;
