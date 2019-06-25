import React from 'react';
import {
  Button,
  Checkbox,
  createStyles,
  Dialog,
  DialogContent,
  FormControlLabel,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import { UserSession } from '../../api';
import { EmailState, UsernameState } from './types';
import { CustomTextField } from '..';
import { VerificationDialogContent } from '.';

/**
 * SignUpDialog component style
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
        marginBottom: 16
      },
      flip: {
        textTransform: 'none',
        marginBottom: 8
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
      button: {
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 8
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

/**
 * SignUpDialog component prop types
 */
interface SignUpDialogProps {
  // Open/close status boolean
  open: boolean;
  // Current user session
  user: UserSession;
  // Function to close parent dialogs
  handleClose: VoidFunction;
  // Function to flip betweeen log in/sign up
  flip: VoidFunction;
  // Authorization error status
  authError: string;
  // Authorization error toggler
  setAuthError: (message: string) => void;
}

/**
 * Sign up dialog, accepts user email and name and verifies accoutn through Auth0
 */
const SignUpDialog = ({
  open,
  user,
  handleClose,
  flip,
  authError,
  setAuthError
}: SignUpDialogProps): React.ReactElement => {
  const classes = useStyles();

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

  // Auth0 verification email sent true/false
  const [sent, setSent] = React.useState<boolean>(false);

  // Email error checking
  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );

  // Username error checking
  const usernameErrorRegex = !username.name.match(/^[a-zA-Z0-9_]+$/);

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

  // Register username input
  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAuthError('');
    setUsername({
      name: event.target.value,
      error: false
    });
  };

  // Register agreement checkbox selection
  const handleCheck = (): void => {
    setChecked(!checked);
  };

  // Sign up with given email, username
  const handleSend = async (): Promise<void> => {
    // Run regex error matching on inputs
    if (emailErrorRegex || usernameErrorRegex) {
      if (emailErrorRegex) {
        setEmail({
          address: email.address,
          error: true
        });
      }
      if (usernameErrorRegex) {
        setUsername({
          name: username.name,
          error: true
        });
      }
      setChecked(false);
      return;
    }

    setSent(true);

    // Generate login token on back-end
    let status = await user.setToken(email.address, username.name);

    // If not successful, display error message
    if (status === 307 || status === 400) {
      setAuthError(
        'Failed to register account. Try again or use a different email.'
      );
      setSent(false);
      setChecked(false);
      return;
    }

    // Send authorization prompt to user
    try {
      await user.send(email.address);
    } catch (Auth0Error) {
      setAuthError('Authorization failed. Please try again later.');
      setSent(false);
      return;
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
      aria-labelledby="sign-up-dialog"
      open={open}
      disableBackdropClick={sent}
      fullWidth
      maxWidth="xs"
    >
      <Typography
        className={classes.title}
        id="sign-up-dialog-title"
        color="textSecondary"
        variant="h4"
      >
        Sign Up
      </Typography>
      {!sent ? (
        <DialogContent className={classes.content}>
          <CustomTextField
            id="filled-email"
            label="Email"
            autoFocus={true}
            required={true}
            error={email.error}
            className={classes.textField}
            value={email.address}
            onChange={handleEmailChange}
            margin="normal"
            variant="filled"
            helperText={email.error && 'Invalid email'}
            onKeyPress={handleKeyPress}
          />
          <CustomTextField
            id="filled-username"
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
            onKeyPress={handleKeyPress}
          />
          <FormControlLabel
            className={classes.agree}
            classes={{
              label: classes.agreeLabel
            }}
            control={<Checkbox checked={checked} onChange={handleCheck} />}
            label="I agree to share my email with IdeaDog."
          />
          <Button className={classes.flip} onClick={flip}>
            <Typography color="secondary">Back to login.</Typography>
          </Button>
          <Button
            disabled={email.error || username.error || !checked}
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            onClick={handleSend}
          >
            Register
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

export default SignUpDialog;
