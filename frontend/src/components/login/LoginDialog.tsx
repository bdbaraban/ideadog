import React from 'react';
import {
  Button,
  Checkbox,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCurrentRoute, useNavigation } from 'react-navi';
import { UserSession } from '../../api';
import { VoidFunction } from '../../types';
import { CustomTextField } from '../';

/**
 * LoginDialog component style
 */
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
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
      },
      button: {
        fontWeight: 'bold',
        marginTop: 8
      },
      flip: {
        textTransform: 'none'
      },
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 150
      },
      typography: {
        padding: theme.spacing(1)
      }
    })
);

/**
 * Email state type
 */
interface EmailState {
  // Email address
  address: string;

  // Invalid email true/false
  error: boolean;
}

/**
 * Username state type
 */
interface UsernameState {
  // Username
  name: string;

  // Invalid username true/false
  error: boolean;
}

/**
 * LoginDialog component prop types
 */
interface LoginDialogProps {
  // Current User session
  user: UserSession;

  // Open/closed status
  open: boolean;

  // Open/close toggler inherited from grandparent component
  toggleGrandparentOpen: VoidFunction | null;

  // Open/close toggler inherited from parent component
  toggleParentOpen: VoidFunction;
}

/**
 * Log in/sign up component
 */
const LoginDialog = ({
  user,
  open,
  toggleGrandparentOpen,
  toggleParentOpen
}: LoginDialogProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  // Entered email
  const [email, setEmail] = React.useState<EmailState>({
    address: '',
    error: false
  });
  // Entered username
  const [username, setUsername] = React.useState<UsernameState>({
    name: '',
    error: false
  });
  // Agreement checked true/false
  const [checked, setChecked] = React.useState<boolean>(false);
  // Log in/sign up toggler booolean
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // Log in/sign up waiting boolean
  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);
  // Log in/sign up authorization error boolean
  const [authError, setAuthError] = React.useState<boolean>(false);

  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
  const usernameErrorRegex = !username.name.match(/^[a-zA-Z0-9_]+$/);

  // Circular progress indicator to display during login waiting
  const WaitingIndicator = (): React.ReactElement => {
    return (
      <div className={classes.container}>
        <CircularProgress color="secondary" size={60} />
        <Typography color="textSecondary">
          A verification email has been sent to the given address. The
          authentication process will expire after 15 minutes.
        </Typography>
      </div>
    );
  };

  // Login error typography element
  const LoginErrorTypography = (): React.ReactElement => {
    return (
      <Typography color="textSecondary">
        The account with the given email does not exist. Please register a new
        account.
      </Typography>
    );
  };

  // Signup error typography element
  const SignUpErrorTypography = (): React.ReactElement => {
    return (
      <Typography className={classes.typography} color="textSecondary">
        Could not register an account with the given email.
      </Typography>
    );
  };

  const handleClose = (): void => {
    if (toggleGrandparentOpen) {
      toggleGrandparentOpen();
    }
    toggleParentOpen();
    setIsOpen(false);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAuthError(false);
    setEmail({
      address: event.target.value,
      error: false
    });
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAuthError(false);
    setUsername({
      name: event.target.value,
      error: false
    });
  };

  const handleCheck = (): void => {
    setChecked(!checked);
  };

  const flip = (): void => {
    setIsOpen(!isOpen);
    setEmail({
      address: '',
      error: false
    });
    setUsername({
      name: '',
      error: false
    });
    setChecked(false);
  };

  const handleLogin = async (): Promise<void> => {
    // Run regex error matching on input
    if (emailErrorRegex) {
      setEmail({
        address: email.address,
        error: true
      });
      return;
    }

    // Run waiting indicator
    setIsWaiting(true);

    // Await login response
    const status = await user.login(email.address);

    // Close waiting indicator
    setIsWaiting(false);

    if (status === 307) {
      // If not successful, flip to sign up card
      setAuthError(true);
      flip();
    } else {
      // Otherwise, close dialog and refresh page
      if (toggleGrandparentOpen) {
        toggleGrandparentOpen();
      }
      toggleParentOpen();
      navigation.navigate(route.url.href);
    }
  };

  const handleSignUp = async (): Promise<void> => {
    // Run regex error matching on inputs
    if (emailErrorRegex) {
      setEmail({
        address: email.address,
        error: true
      });
      return;
    }
    if (usernameErrorRegex) {
      setUsername({
        name: username.name,
        error: true
      });
      return;
    }

    // Run waiting indicator
    setIsWaiting(true);

    // Await signup response
    const status = await user.signup(email.address, username.name);

    // Close waiting indicator
    setIsWaiting(false);

    if (status === 307) {
      // If not successful, stay on signup card
      setAuthError(true);
      setChecked(false);
      setEmail({
        address: '',
        error: true
      });
      setUsername({
        name: '',
        error: true
      });
    } else {
      // Otherwise, close dialog and refresh page
      if (toggleGrandparentOpen) {
        toggleGrandparentOpen();
      }
      toggleParentOpen();
      navigation.navigate(route.url.href);
    }
  };

  return !isOpen ? (
    <Dialog onClose={handleClose} aria-labelledby="login-dialog" open={open}>
      <DialogTitle id="login-dialog-title" className={classes.title}>
        Log In
        {!isWaiting ? (
          <DialogContent className={classes.content}>
            <CustomTextField
              id="filled-email"
              label="Email"
              required
              error={email.error}
              className={classes.textField}
              value={email.address}
              onChange={handleEmailChange}
              margin="normal"
              variant="filled"
              helperText={email.error && 'Invalid email'}
            />
            <Button onClick={flip}>
              <Typography color="secondary" className={classes.flip}>
                No account? Sign up here.
              </Typography>
            </Button>
            <Button
              disabled={email.error}
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={handleLogin}
            >
              Log In
            </Button>
            {authError && <LoginErrorTypography />}
          </DialogContent>
        ) : (
          <DialogContent className={classes.content}>
            <WaitingIndicator />
          </DialogContent>
        )}
      </DialogTitle>
    </Dialog>
  ) : (
    <Dialog onClose={handleClose} aria-labelledby="register-dialog" open={open}>
      <DialogTitle id="login-dialog-title" className={classes.title}>
        Sign Up
        {!isWaiting ? (
          <DialogContent className={classes.content}>
            <CustomTextField
              id="filled-name"
              label="Email"
              required={true}
              error={email.error}
              className={classes.textField}
              value={email.address}
              onChange={handleEmailChange}
              margin="normal"
              variant="filled"
              helperText={email.error && 'Invalid email'}
            />
            <CustomTextField
              id="filled-name"
              label="Username"
              required={true}
              error={username.error}
              className={classes.textField}
              value={username.name}
              onChange={handleUsernameChange}
              margin="normal"
              variant="filled"
              helperText={
                username.error && 'Letters, digits, or underscores only.'
              }
            />
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheck} />}
              label="I agree to share my email with IdeaDog."
            />
            <Button onClick={flip}>
              <Typography className={classes.flip} color="secondary">
                Back to login.
              </Typography>
            </Button>
            <Button
              disabled={email.error || username.error || !checked}
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={handleSignUp}
            >
              Register
            </Button>
            {authError && <SignUpErrorTypography />}
          </DialogContent>
        ) : (
          <DialogContent className={classes.content}>
            <WaitingIndicator />
          </DialogContent>
        )}
      </DialogTitle>
    </Dialog>
  );
};

export default React.memo(LoginDialog);
