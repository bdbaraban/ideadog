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
import { SadTully } from '../../../icons';
import { Styles } from 'jss';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      loginDialogTitle: {
        color: theme.palette.common.white,
        textAlign: 'center'
      },
      loginDialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      loginDialogButton: {
        fontWeight: 'bold',
        marginTop: 8
      }
    })
);

interface LoginDialogProps {
  open: boolean;
  handleClose: () => void;
  handleLogin: () => void;
}

const LoginDialog = ({
  open,
  handleClose,
  handleLogin
}: LoginDialogProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} aria-labelledby="new-idea-dialog" open={open}>
      <DialogTitle
        id="not-logged-in-dialog-title"
        className={classes.loginDialogTitle}
      >
        You must be logged in to post ideas.
        <DialogContent className={classes.loginDialogContent}>
          <SvgIcon component={(): React.ReactElement => SadTully(92, 1)}>
            &nbsp;
          </SvgIcon>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.loginDialogButton}
            onClick={handleLogin}
          >
            Log In/Sign Up
          </Button>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default LoginDialog;
