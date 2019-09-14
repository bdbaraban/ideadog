import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  ReactElement,
  SetStateAction
} from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { CustomTextField } from 'components';
import { EmailState, ErrorState } from 'components/AuthorizationButton';
import fetch from 'isomorphic-unfetch';

// LoginDialog component style
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
    textField: {
      margin: 0
    },
    flipButton: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    flipText: {
      textTransform: 'none'
    },
    submitButton: {
      fontWeight: 'bold'
    },
    error: {
      padding: theme.spacing(1),
      textAlign: 'center'
    }
  })
);

// LoginDialog component prop types
interface LoginDialogProps {
  flip: VoidFunction; // Flip between login/sign up
  email: EmailState; // Entered email address
  setEmail: Dispatch<SetStateAction<EmailState>>; // Change email state
  authError: ErrorState; // Authorization error
  setAuthError: Dispatch<SetStateAction<ErrorState>>; // Change authorization error state
  handleSubmit: VoidFunction; // Shift to verification dialog on submit
}

/**
 * Dialog to login
 */
const LoginDialog = ({
  flip,
  email,
  setEmail,
  authError,
  setAuthError,
  handleSubmit
}: LoginDialogProps): ReactElement => {
  const classes = useStyles();

  // Email error checking
  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );

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

  // Send Auth0 verification email
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
      <DialogTitle id="login-dialog-title" className={classes.title}>
        LOG IN
      </DialogTitle>
      <DialogContent className={classes.content}>
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
        <Button className={classes.flipButton} onClick={flip}>
          <Typography color="secondary" className={classes.flipText}>
            No account? Sign up here.
          </Typography>
        </Button>
        <Button
          className={classes.submitButton}
          disabled={email.error.status || authError.status}
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

export default LoginDialog;
