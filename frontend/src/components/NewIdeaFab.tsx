import React from 'react';
import { Fab, makeStyles, createStyles, Icon } from '@material-ui/core';
import { Styles } from 'jss';
import { NewIdeaDialog, LoginDialog } from './';
import { useUserStatus, Tag } from '../api';

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
}

const NewIdeaFab = ({ allTags }: NewIdeaFabProps): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const [isOnline, setIsOnline] = React.useState<boolean>(useUserStatus());

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleLogin = (): void => {
    setIsOnline(true);
  };

  return (
    <Fab
      color="secondary"
      aria-label="Add"
      disabled={open}
      className={classes.fab}
      onClick={handleOpen}
    >
      <Icon fontSize="large">edit</Icon>
      {isOnline ? (
        // New idea dialog, if user is logged in
        <NewIdeaDialog
          open={open}
          handleClose={handleClose}
          allTags={allTags}
        />
      ) : (
        // Login dialog, if user is not logged in
        <LoginDialog
          open={open}
          handleClose={handleClose}
          handleLogin={handleLogin}
        />
      )}
    </Fab>
  );
};

export default NewIdeaFab;
