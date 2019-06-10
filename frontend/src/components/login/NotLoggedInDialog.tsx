import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  SvgIcon,
  Button,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import { Styles } from 'jss';
import { SadTully } from '../../icons';
import { UserAuth } from '../../api';
import { LoginDialog } from '.';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      title: {
        color: theme.palette.common.white,
        textAlign: 'center'
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      button: {
        fontWeight: 'bold',
        marginTop: 8
      }
    })
);

interface LoginDialogProps {
  open: boolean;
  toggleSelfOpen: () => void;
  user: UserAuth;
}

const NotLoggedInDialog = ({
  open,
  toggleSelfOpen,
  user
}: LoginDialogProps): React.ReactElement => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog
      onClose={toggleSelfOpen}
      aria-labelledby="new-idea-dialog"
      open={open}
    >
      {!isOpen ? (
        <DialogTitle id="not-logged-in-dialog-title" className={classes.title}>
          You must be logged in to post ideas.
          <DialogContent className={classes.content}>
            <SvgIcon component={(): React.ReactElement => SadTully(92, 1)}>
              &nbsp;
            </SvgIcon>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={toggleOpen}
            >
              Log In/Sign Up
            </Button>
          </DialogContent>
        </DialogTitle>
      ) : (
        <LoginDialog user={user} toggleOpen={toggleSelfOpen} />
      )}
    </Dialog>
  );
};

export default NotLoggedInDialog;
