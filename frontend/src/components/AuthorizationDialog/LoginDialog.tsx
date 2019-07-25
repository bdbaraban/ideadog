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
import { UserSession } from '../../api';
import { CustomTextField } from '..';
import { VerificationDialogContent } from '.';
import { useNavigation } from 'react-navi';

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
        margin: `8px ${theme.spacing(1)} 8px ${theme.spacing(1)}`
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
 * Email state type
 */
interface EmailState {
  // Email address
  address: string;
  // Invalid email true/false
  error: boolean;
}

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
 * Login dialog, accepts user email and verifies account through Auth0
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

  // Entered email
  const [email, setEmail] = React.useState<EmailState>({
    address: '',
    error: false
  });

  // Auth0 verification email sent true/false
  const [sent, setSent] = React.useState<boolean>(false);

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

  // Send Auth0 verification email
  const handleSend = async (): Promise<void> => {
    // Run regex error matching on input
    if (emailErrorRegex) {
      setEmail({
        address: email.address,
        error: true
      });
      return;
    }

    setSent(true);

    // Generate login token on back-end
    let status = await user.setChallengeToken(email.address);

    if (status === 307 || status === 400) {
      if (status === 307) {
        // If user does not exist
        setAuthError(
          'No accounts with the given email exist. Please register a new account.'
        );
      } else {
        // Otherwise, display service failure message
        setAuthError('Authorization failed. Please try again later.');
      }
      setSent(false);
      return;
    }

    // Send Auth0 verification email
    try {
      user.send(email.address);
    } catch (Auth0Error) {
      setAuthError('Authorization failed. Please try again later.');
      setSent(false);
    }
  };

  // Verify Auth0 passwordless code
  const handleVerification = async (
    verificationCode: string
  ): Promise<void> => {
    try {
      user.verify(email.address, verificationCode);
    } catch (Auth0Error) {
      setAuthError('Invalid token. Please try again.');
      setSent(false);
    }
  };

  // Log in to dummy account
  const loginDummy = (): void => {
    window.localStorage.setItem(
      'bearer',
      '9WURFiA0hozMhQWEV614De8c25bNqUhMZZCJ8CaQ4hM='
    );
    navigation.navigate('/');
    handleClose();
  };

  // Enable enter-key submission
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleSend();
      event.preventDefault();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="login-dialog"
      open={open}
      disableBackdropClick={sent}
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
      {!sent ? (
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
          <Button onClick={loginDummy}>
            <Typography color="secondary" className={classes.flip}>
              Or, log into a dummy account.
            </Typography>
          </Button>
          <Button
            className={classes.button}
            disabled={email.error}
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSend}
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
          <VerificationDialogContent handleVerification={handleVerification} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default LoginDialog;
