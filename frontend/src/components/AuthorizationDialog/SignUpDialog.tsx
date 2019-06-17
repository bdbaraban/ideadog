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
import { useCurrentRoute, useNavigation } from 'react-navi';
import { UserSession } from '../../api';
import { EmailState, UsernameState } from './types';
import { CustomTextField } from '..';
import { WaitingIndicator } from '.';

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
      typography: {
        padding: theme.spacing(1)
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
}

/**
 * Sign up dialog
 */
const SignUpDialog = ({
  open,
  user,
  handleClose,
  flip
}: SignUpDialogProps): React.ReactElement => {
  const classes = useStyles();
  const navigation = useNavigation();
  const route = useCurrentRoute();

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

  // Log in/sign up waiting boolean
  const [waiting, setWaiting] = React.useState<boolean>(false);

  // Log in/sign up authorization error boolean
  const [authError, setAuthError] = React.useState<boolean>(false);

  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
  const usernameErrorRegex = !username.name.match(/^[a-zA-Z0-9_]+$/);

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
    setWaiting(true);

    // Await signup response
    const status = await user.prompt(email.address);

    // Close waiting indicator
    setWaiting(false);

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
      setEmail({
        address: '',
        error: false
      });
      setUsername({
        name: '',
        error: false
      });
      handleClose();
      navigation.navigate(route.url.href);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="sign-up-dialog"
      open={open}
      disableBackdropClick={waiting}
      fullWidth
      maxWidth="xs"
    >
      <Typography
        className={classes.title}
        id="login-dialog-title"
        color="textSecondary"
        variant="h4"
      >
        Sign Up
      </Typography>
      {!waiting ? (
        <DialogContent className={classes.content}>
          <CustomTextField
            id="filled-name"
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
            onClick={handleSignUp}
          >
            Register
          </Button>
          {authError && (
            <Typography className={classes.typography} color="error">
              Could not register an account with the given email.
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

export default SignUpDialog;
