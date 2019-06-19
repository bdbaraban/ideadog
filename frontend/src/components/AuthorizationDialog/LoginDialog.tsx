import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { useCurrentRoute, useNavigation } from 'react-navi';
import { UserSession } from '../../api';
import { VoidFunction } from '../../types';
import { CustomTextField } from '..';
import { EmailState, WaitingIndicator } from '.';

/**
 * LoginDialog component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      title: {
        textAlign: 'center',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        flex: '0 0 auto',
        margin: 0,
        padding: '24px 24px 8px 24px'
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 24px 24px 24px',
        width: '100%'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: 8,
        marginBottom: 8
      },
      flipText: {
        marginTop: 8,
        marginBottom: 8
      },
      button: {
        fontWeight: 'bold',
        marginTop: 8
      },
      flip: {
        textTransform: 'none'
      },
      error: {
        padding: theme.spacing(1),
        textAlign: 'center'
      }
    })
);

/**
 * LoginDialog component prop types
 */
interface LoginDialogProps {
  // Open/close status boolean
  open: boolean;

  // Current user session
  user: UserSession;

  // Function to close parent dialogs
  handleClose: VoidFunction;

  // Function to flip betweeen log in/sign up
  flip: VoidFunction;

  // Authorization error message
  authError: string;

  // Authorization error toggler
  setAuthError: (message: string) => void;
}

/**
 * Log In dialog
 */
const LoginDialog = ({
  open,
  user,
  handleClose,
  flip,
  authError,
  setAuthError
}: LoginDialogProps): React.ReactElement => {
  const classes = useStyles();
  const navigation = useNavigation();
  const route = useCurrentRoute();

  // Entered email
  const [email, setEmail] = React.useState<EmailState>({
    address: '',
    error: false
  });

  // Log in/sign up waiting boolean
  const [waiting, setWaiting] = React.useState<boolean>(false);

  // Email error checking
  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );

  // Register email input
  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAuthError('');
    setEmail({
      address: event.target.value,
      error: false
    });
  };

  // Login in with entered email
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
    setWaiting(true);

    // Generate login token on back-end
    let status = await user.setToken(email.address);

    if (status === 307) {
      setAuthError(
        // If user does not exist, flip to sign up card
        'The account with the given email does not exist. Please register a new account'
      );
      flip();
      setWaiting(false);
      return;
    } else if (status === 400) {
      // Otherwise, display service failure message
      setAuthError('Authorization failed. Please try again later.');
      setWaiting(false);
      return;
    }

    // Send authorization prompt to user
    status = await user.prompt(email.address);

    if (status === 307) {
      // Rejected
      setAuthError('Authorization request rejected.');
      setWaiting(false);
      return;
    } else if (status === 400) {
      // Timed out
      setAuthError('Authorization request timed out.');
      setWaiting(false);
      return;
    }

    // Log in and set bearer token for session
    status = await user.setBearer();

    if (status === 200) {
      // Upon success, refresh page
      setAuthError('');
      setWaiting(false);
      handleClose();
      setEmail({
        address: '',
        error: false
      });
      navigation.navigate(route.url.href);
    } else if (status === 307) {
      setAuthError(
        // If user does not exist, flip to sign up card
        'The account with the given email does not exist. Please register a new account'
      );
      flip();
      setWaiting(false);
    } else {
      setAuthError('Authorization failed. Please try again later.');
      setWaiting(false);
    }
  };

  // Enable enter-key submission
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleLogin();
      event.preventDefault();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="login-dialog"
      open={open}
      disableBackdropClick={waiting}
      maxWidth="xs"
      fullWidth
    >
      <Typography
        className={classes.title}
        id="login-dialog-title"
        color="textSecondary"
        variant="h4"
      >
        Log In
      </Typography>
      {!waiting ? (
        <DialogContent className={classes.content}>
          <CustomTextField
            className={classes.textField}
            id="filled-email"
            label="Email"
            autoFocus
            required
            error={email.error}
            value={email.address}
            onChange={handleEmailChange}
            margin="normal"
            variant="filled"
            helperText={email.error && 'Invalid email'}
            onKeyPress={handleKeyPress}
          />
          <Button className={classes.flipText} onClick={flip}>
            <Typography color="secondary" className={classes.flip}>
              No account? Sign up here.
            </Typography>
          </Button>
          <Button
            className={classes.button}
            disabled={email.error}
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleLogin}
          >
            Log In
          </Button>
          {authError !== '' && (
            <Typography className={classes.error} color="error">
              {authError}
            </Typography>
          )}
        </DialogContent>
      ) : (
        <DialogContent className={classes.content}>
          <WaitingIndicator />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default LoginDialog;
