import React, { ChangeEvent, FC, useState } from 'react';

import { CustomDialog } from 'components/common';
import AuthButton from './AuthButton';
import LoginDialog from './LoginDialog';
import SignUpDialog from './SignUpDialog';
import VerificationDialog from './VerificationDialog';

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
 * Wraps button controlling opening/closing of login and signup dialogs
 */
const AuthComponentContainer: FC<{}> = () => {
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

  // Register email input
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (authError.status) {
      setAuthError({
        status: false,
        message: ''
      });
    }

    setEmail({
      address: event.target.value,
      error: {
        status: false,
        message: ''
      }
    });
  };

  // Register username input
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (authError.status) {
      setAuthError({
        status: false,
        message: ''
      });
    }

    setUsername({
      name: event.target.value,
      error: {
        status: false,
        message: ''
      }
    });
  };

  // Set verification dialog open
  const handleSubmit = (): void => {
    setDialog(DIALOG.VERIFICATION);
  };

  // Flip between log in/sign up dialogs
  const flip = (): void => {
    setDialog(dialog === DIALOG.LOGIN ? DIALOG.SIGNUP : DIALOG.LOGIN);
  };

  // Email error checking
  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );

  // Username error checking
  const usernameErrorRegex = !username.name.match(/^[a-zA-Z0-9_]+$/);

  return (
    <>
      <AuthButton handleClick={handleClick} />
      <CustomDialog
        onClose={handleClose}
        aria-labelledby="login-dialog"
        open={open}
        size={dialog === DIALOG.VERIFICATION ? '540' : '444'}
      >
        {dialog === DIALOG.LOGIN ? (
          <LoginDialog
            email={email}
            setEmail={setEmail}
            handleEmailChange={handleEmailChange}
            emailErrorRegex={emailErrorRegex}
            authError={authError}
            setAuthError={setAuthError}
            flip={flip}
            handleSubmit={handleSubmit}
          />
        ) : dialog === DIALOG.SIGNUP ? (
          <SignUpDialog
            email={email}
            setEmail={setEmail}
            handleEmailChange={handleEmailChange}
            emailErrorRegex={emailErrorRegex}
            username={username}
            setUsername={setUsername}
            handleUsernameChange={handleUsernameChange}
            usernameErrorRegex={usernameErrorRegex}
            checked={checked}
            setChecked={setChecked}
            authError={authError}
            setAuthError={setAuthError}
            flip={flip}
            handleSubmit={handleSubmit}
          />
        ) : (
          <VerificationDialog />
        )}
      </CustomDialog>
    </>
  );
};

export default AuthComponentContainer;
