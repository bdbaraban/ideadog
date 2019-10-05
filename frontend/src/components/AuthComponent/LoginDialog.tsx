import React, {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction
} from 'react';

import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {
  CustomDialogContent,
  CustomDialogTitle,
  CustomTextField
} from 'components/common';
import { EmailState, ErrorState } from './AuthComponentContainer';
import FlipButton from './FlipButton';
import SubmitButton from './SubmitButton';
import fetch from 'isomorphic-unfetch';

// LoginDialog component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: 0
    },
    error: {
      marginTop: theme.spacing(2)
    }
  })
);

// LoginDialog component prop types
interface LoginDialogProps {
  flip: VoidFunction; // Flip between login/sign up
  email: EmailState; // Entered email address
  setEmail: Dispatch<SetStateAction<EmailState>>; // Change email state
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void; // Register email input
  emailErrorRegex: boolean; // Email error
  authError: ErrorState; // Authorization error
  setAuthError: Dispatch<SetStateAction<ErrorState>>; // Change authorization error state
  handleSubmit: VoidFunction; // Shift to verification dialog on submit
}

/**
 * Dialog to login
 */
const LoginDialog: FC<LoginDialogProps> = ({
  flip,
  email,
  setEmail,
  handleEmailChange,
  emailErrorRegex,
  authError,
  setAuthError,
  handleSubmit
}: LoginDialogProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Send email with magic link
  const submit = async (): Promise<void> => {
    // Run regex error matching on input
    if (emailErrorRegex) {
      setEmail(email => ({
        address: email.address,
        error: {
          status: true,
          message: 'Invalid email'
        }
      }));
      return;
    }

    // Send email
    const response = await fetch(`${process.env.IDEADOG_DOMAIN}/startLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.address })
    });

    const data = await response.json();

    if (!data.success) {
      setAuthError({
        status: true,
        message: data.message
      });
    } else {
      handleSubmit();
    }
  };

  // Enable enter-key submission
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      submit();
      event.preventDefault();
    }
  };

  return (
    <>
      <CustomDialogTitle id="login-dialog-title">LOG IN</CustomDialogTitle>
      <CustomDialogContent>
        <CustomTextField
          className={classes.textField}
          id="filled-email"
          label="Email"
          required
          error={email.error.status}
          value={email.address}
          onChange={handleEmailChange}
          margin="normal"
          variant="filled"
          helperText={email.error.status && email.error.message}
          onKeyPress={handleKeyPress}
        />
        <FlipButton text="No account? Sign up here." onClick={flip} />
        <SubmitButton
          disabled={email.error.status || authError.status}
          onClick={submit}
        />
        {authError.status && (
          <Typography color="error" className={classes.error}>
            {authError.message}
          </Typography>
        )}
      </CustomDialogContent>
    </>
  );
};

export default LoginDialog;
