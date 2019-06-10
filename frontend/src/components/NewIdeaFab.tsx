import React from 'react';
import { Fab, makeStyles, createStyles, Icon } from '@material-ui/core';
import { Styles } from 'jss';
import { NewIdeaDialog, NotLoggedInDialog } from './';
import { Tag, UserAuth } from '../api';

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

interface NewIdeaFabProps {
  allTags: Tag[];
  user: UserAuth;
}

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
      {user.currentUser ? (
        // New idea dialog, if user is logged in
        <NewIdeaDialog open={open} toggleOpen={toggleOpen} allTags={allTags} />
      ) : (
        // Login dialog, if user is not logged in
        <NotLoggedInDialog
          user={user}
          open={open}
          toggleSelfOpen={toggleOpen}
        />
      )}
    </Fab>
  );
};

export default NewIdeaFab;
