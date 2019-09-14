import React, { ReactElement, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import PersonIcon from '@material-ui/icons/Person';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { LoginDialog, SignUpDialog, VerificationDialog } from 'components';

// SignUpDialog component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperProps: {
      height: 'min-content',
      maxWidth: 444,
      width: 'calc(100% - 96px)',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
        maxWidth: 'none',
        minWidth: '100vw'
      }
    }
  })
);

// Current opened dialog enumeration
enum DIALOG {
  LOGIN = 0,
  SIGNUP = 1,
  VERIFICATION = 2
}

// Generic error type
export interface ErrorState {
  status: boolean;
  message: string;
}

// Email state type
export interface EmailState {
  address: string; // Entered email
  error: ErrorState; // Email error
}

// Username state type
export interface UsernameState {
  name: string; // Entered username
  error: ErrorState; // Username error
}

/**
 * Button controlling login and signup dialogs
 */
const AuthorizationButton = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Dialog open/closed boolean
  const [open, setOpen] = useState<boolean>(false);

  // Type of dialog currently open
  const [dialog, setDialog] = useState<DIALOG>(DIALOG.LOGIN);

  // Entered email - shared between dialogs
  const [email, setEmail] = useState<EmailState>({
    address: '',
    error: {
      status: false,
      message: ''
    }
  });

  // Entered username
  const [username, setUsername] = useState<UsernameState>({
    name: '',
    error: {
      status: false,
      message: ''
    }
  });

  // Agreement checked true/false
  const [checked, setChecked] = useState<boolean>(false);

  // Login/signup error status
  const [authError, setAuthError] = useState<ErrorState>({
    status: false,
    message: ''
  });

  // Open dialog
  const handleClick = (): void => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = (): void => {
    setOpen(false);
    setDialog(DIALOG.LOGIN);
    setEmail({
      address: '',
      error: {
        status: false,
        message: ''
      }
    });
    setUsername({
      name: '',
      error: {
        status: false,
        message: ''
      }
    });
    setChecked(false);
  };

  // Set verification dialog open
  const handleSubmit = (): void => {
    setDialog(DIALOG.VERIFICATION);
  };

  return (
    <>
      <Hidden xsDown>
        <Fab
          color="secondary"
          variant="extended"
          size="medium"
          aria-label="login/signup"
          onClick={handleClick}
        >
          <PersonIcon />
          Log in/Sign up
        </Fab>
      </Hidden>
      <Hidden smUp>
        <Fab
          color="secondary"
          size="small"
          aria-label="login/signup"
          onClick={handleClick}
        >
          <PersonIcon />
        </Fab>
      </Hidden>
      <Dialog
        onClose={handleClose}
        aria-labelledby="login-dialog"
        open={open}
        PaperProps={{
          className: classes.paperProps
        }}
      >
        {dialog === DIALOG.LOGIN ? (
          <LoginDialog
            email={email}
            setEmail={setEmail}
            authError={authError}
            setAuthError={setAuthError}
            flip={(): void => setDialog(DIALOG.SIGNUP)}
            handleSubmit={handleSubmit}
          />
        ) : dialog === DIALOG.SIGNUP ? (
          <SignUpDialog
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            checked={checked}
            setChecked={setChecked}
            authError={authError}
            setAuthError={setAuthError}
            flip={(): void => setDialog(DIALOG.LOGIN)}
            handleSubmit={handleSubmit}
          />
        ) : (
          <VerificationDialog />
        )}
      </Dialog>
    </>
  );
};

export default AuthorizationButton;
