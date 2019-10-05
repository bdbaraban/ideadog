import React, {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction
} from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import TextButton from './TextButton';
import SubmitButton from './SubmitButton';
import {
  CustomDialogContent,
  CustomDialogTitle,
  CustomTextField
} from 'components/common';
import {
  EmailState,
  ErrorState,
  UsernameState
} from 'components/AuthComponent/AuthComponentContainer';
import 'isomorphic-unfetch';

// SignUpDialog component styles
const useStyles = makeStyles(() =>
  createStyles({
    emailField: {
      margin: 0
    },
    usernameField: {
      margin: 0,
      marginTop: 8
    },
    textButton: {
      textAlign: 'center'
    },
    agree: {
      color: 'white',
      margin: 0,
      textAlign: 'center'
    }
  })
);

// SignUpDialog component prop types
interface SignUpDialogProps {
  flip: VoidFunction; // Flip between login/sign up
  email: EmailState; // Entered email address
  setEmail: Dispatch<SetStateAction<EmailState>>; // Set email state
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void; // Register email input
  emailErrorRegex: boolean; // Email error
  username: UsernameState; // Entered username
  setUsername: Dispatch<SetStateAction<UsernameState>>; // Set username state
  handleUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void; // Register username input
  usernameErrorRegex: boolean; // Username error
  authError: ErrorState; // Authorization error
  setAuthError: Dispatch<SetStateAction<ErrorState>>; // Change authorization error state
  checked: boolean; // Aggreement checked true/false
  setChecked: Dispatch<SetStateAction<boolean>>; // Set checked status
  handleSubmit: VoidFunction; // Flip to verification dialog on submit
}

/**
 * Dialog to sign up
 */
const SignUpDialog: FC<SignUpDialogProps> = ({
  flip,
  email,
  setEmail,
  handleEmailChange,
  emailErrorRegex,
  username,
  setUsername,
  handleUsernameChange,
  usernameErrorRegex,
  checked,
  authError,
  setAuthError,
  setChecked,
  handleSubmit
}: SignUpDialogProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Register agreement checkbox selection
  const toggleCheck = (): void => {
    setChecked(!checked);
  };

  // Send magic link email
  const submit = async (): Promise<void> => {
    // Run regex error matching on inputs
    if (emailErrorRegex || usernameErrorRegex) {
      if (emailErrorRegex) {
        setEmail(email => ({
          address: email.address,
          error: {
            status: true,
            message: 'Invalid email.'
          }
        }));
      }
      if (usernameErrorRegex) {
        setUsername(username => ({
          name: username.name,
          error: {
            status: true,
            message: 'Letters, digits, or underscores only.'
          }
        }));
      }
      setChecked(false);
      return;
    }

    const response = await fetch(`${process.env.IDEADOG_DOMAIN}/startSignup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.address, username: username.name })
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
      <CustomDialogTitle id="login-dialog-title">SIGN UP</CustomDialogTitle>
      <CustomDialogContent>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <CustomTextField
              id="filled-email"
              label="Email"
              required={true}
              error={email.error.status}
              className={classes.emailField}
              value={email.address}
              onChange={handleEmailChange}
              margin="normal"
              variant="filled"
              helperText={email.error.status && email.error.message}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item>
            <CustomTextField
              id="filled-username"
              label="Username"
              required={true}
              className={classes.usernameField}
              error={username.error.status}
              value={username.name}
              onChange={handleUsernameChange}
              margin="normal"
              variant="filled"
              helperText={username.error.status && username.error.message}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              className={classes.agree}
              control={<Checkbox checked={checked} onChange={toggleCheck} />}
              label="I agree to share my email with IdeaDog."
            />
          </Grid>
          <Grid item xs={12} className={classes.textButton}>
            <TextButton text="Back to login." onClick={flip} />
          </Grid>
          <Grid item>
            <SubmitButton
              disabled={email.error.status || username.error.status || !checked}
              onClick={submit}
            />
          </Grid>
          {authError.status && (
            <Grid item>
              <Typography color="error">{authError.message}</Typography>
            </Grid>
          )}
        </Grid>
      </CustomDialogContent>
    </>
  );
};

export default SignUpDialog;
