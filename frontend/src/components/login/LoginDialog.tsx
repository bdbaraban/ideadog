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

  // Open/close toggler inherited from parent component
  toggleSelfOpen: VoidFunction;
}

/**
 * Log in/sign up component
 */
const LoginDialog = ({
  user,
  open,
  toggleSelfOpen
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

  const emailErrorRegex = !email.address.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
  const usernameErrorRegex = !username.name.match(/^[a-zA-Z0-9_]+$/);

  const handleClose = (): void => {
    toggleSelfOpen();
    setIsOpen(false);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail({
      address: event.target.value,
      error: false
    });
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
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
    if (emailErrorRegex) {
      setEmail({
        address: email.address,
        error: true
      });
    } else {
      await user.login(email.address, null);
      toggleSelfOpen();
      navigation.navigate(route.url.href);
    }
  };

  const handleRegister = async (): Promise<void> => {
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
    if (!emailErrorRegex && !usernameErrorRegex) {
      await user.register(email.address, username.name);
      toggleSelfOpen();
      navigation.navigate(route.url.href);
    }
  };

  return !isOpen ? (
    <Dialog onClose={handleClose} aria-labelledby="login-dialog" open={open}>
      <DialogTitle id="login-dialog-title" className={classes.title}>
        Log In
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
        </DialogContent>
      </DialogTitle>
    </Dialog>
  ) : (
    <Dialog onClose={handleClose} aria-labelledby="register-dialog" open={open}>
      <DialogTitle id="login-dialog-title" className={classes.title}>
        Sign Up
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
            onClick={handleRegister}
          >
            Register
          </Button>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default React.memo(LoginDialog);
