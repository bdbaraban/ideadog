import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  ReactElement,
  SetStateAction
} from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { CustomTextField } from 'components';
import {
  EmailState,
  ErrorState,
  UsernameState
} from 'components/AuthorizationButton';
import fetch from 'isomorphic-unfetch';

// SignUpDialog component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.common.white,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    content: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      paddingTop: 0,
      width: '100%'
    },
    emailField: {
      marginTop: 0
    },
    flipButton: {},
    flipText: {
      textTransform: 'none'
    },
    agree: {
      color: 'white',
      textAlign: 'center'
    },
    agreeLabel: {
      [theme.breakpoints.down('xs')]: {
        fontSize: '.92rem'
      }
    },
    submitButton: {
      fontWeight: 'bold',
      marginTop: theme.spacing(2)
    },
    text: {
      color: fade(theme.palette.common.white, 0.5),
      textAlign: 'center',
      paddingTop: 8
    },
    error: {
      padding: theme.spacing(1),
      textAlign: 'center'
    }
  })
);

// SignUpDialog component prop types
interface SignUpDialogProps {
  flip: VoidFunction; // Flip between login/sign up
  email: EmailState; // Entered email address
  setEmail: Dispatch<SetStateAction<EmailState>>; // Set email state
  username: UsernameState; // Entered username
  setUsername: Dispatch<SetStateAction<UsernameState>>; // Set username state
  authError: ErrorState; // Authorization error
  setAuthError: Dispatch<SetStateAction<ErrorState>>; // Change authorization error state
  checked: boolean; // Aggreement checked true/false
  setChecked: Dispatch<SetStateAction<boolean>>; // Set checked status
  handleSubmit: VoidFunction; // Flip to verification dialog on submit
}

/**
 * Dialog to sign up
 */
const SignUpDialog = ({
  flip,
  email,
  setEmail,
  username,
  setUsername,
  checked,
  authError,
  setAuthError,
  setChecked,
  handleSubmit
}: SignUpDialogProps): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Email error checking
  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );

  // Username error checking
  const usernameErrorRegex = !username.name.match(/^[a-zA-Z0-9_]+$/);

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

  // Register agreement checkbox selection
  const toggleCheck = (): void => {
    setChecked(!checked);
  };

  // Send Auth0 verification email
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
      <DialogTitle id="login-dialog-title" className={classes.title}>
        SIGN UP
      </DialogTitle>
      <DialogContent className={classes.content}>
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
        <CustomTextField
          id="filled-username"
          label="Username"
          required={true}
          error={username.error.status}
          value={username.name}
          onChange={handleUsernameChange}
          margin="normal"
          variant="filled"
          helperText={username.error.status && username.error.message}
          onKeyPress={handleKeyPress}
        />
        <FormControlLabel
          className={classes.agree}
          classes={{
            label: classes.agreeLabel
          }}
          control={<Checkbox checked={checked} onChange={toggleCheck} />}
          label="I agree to share my email with IdeaDog."
        />
        <Button className={classes.flipButton} onClick={flip}>
          <Typography className={classes.flipText} color="secondary">
            Back to login.
          </Typography>
        </Button>
        <Button
          className={classes.submitButton}
          disabled={email.error.status || username.error.status || !checked}
          variant="contained"
          color="secondary"
          size="large"
          onClick={submit}
        >
          Submit
        </Button>
        {authError.status && (
          <Typography color="error" className={classes.flipText}>
            {authError.message}
          </Typography>
        )}
      </DialogContent>
    </>
  );
};

export default SignUpDialog;
