import React from 'react';
import { createStyles, Fab, Icon, makeStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { UserSession } from '../api';
import { Tag } from '../types';
import { NewIdeaDialog, NotLoggedInDialog } from '.';

/**
 * NewIdeaFab component style
 */
const useStyles = makeStyles(
  (): Styles =>
    createStyles({
      fab: {
        position: 'fixed',
        right: '3.5vw',
        top: '85%'
      }
    })
);

/**
 * NewIdeaFab component props
 */
interface NewIdeaFabProps {
  // Current user session
  user: UserSession;
  // Array of all available tags
  allTags: Tag[];
}

/**
 * Constant floating action button for posting new ideas
 */
const NewIdeaFab = ({ allTags, user }: NewIdeaFabProps): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = (): void => {
    setOpen(!open);
  };

  return (
    <Fab
      color="secondary"
      aria-label="Add"
      disabled={open}
      className={classes.fab}
      onClick={toggleOpen}
    >
      <Icon fontSize="large">edit</Icon>
      {user.current ? (
        // New idea dialog, if user is logged in
        <NewIdeaDialog
          open={open}
          toggleOpen={toggleOpen}
          allTags={allTags}
          user={user}
        />
      ) : (
        // Not-logged-in dialog, if user is not logged in
        <NotLoggedInDialog
          user={user}
          open={open}
          toggleParentOpen={toggleOpen}
        />
      )}
    </Fab>
  );
};

export default React.memo(NewIdeaFab);
