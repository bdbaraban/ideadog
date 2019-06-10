import React from 'react';
import {
  Button,
  Checkbox,
  createStyles,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { CustomTextField } from '../';
import { useNavigation } from 'react-navi';
import { UserAuth } from 'api';

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

interface LoginDialogProps {
  toggleOpen: () => void;
  user: UserAuth;
}

const LoginDialog = ({
  toggleOpen,
  user
}: LoginDialogProps): React.ReactElement => {
  const classes = useStyles();
  const navigation = useNavigation();

  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [usernameError, setUsernameError] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const emailErrorRegex = !email.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
  const usernameErrorRegex = !username.match(/^[a-zA-Z0-9_]+$/);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handleCheck = (): void => {
    setChecked(!checked);
  };

  const flip = (): void => {
    setOpen(!open);
    setEmail('');
    setUsername('');
  };

  const handleLogin = async (): Promise<void> => {
    if (emailErrorRegex) {
      setEmailError(true);
    } else {
      await user.login(email, null);
      toggleOpen();
      navigation.navigate('/home');
    }
  };

  const handleRegister = async (): Promise<void> => {
    if (emailErrorRegex) {
      setEmailError(true);
    }
    if (usernameErrorRegex) {
      setUsernameError(true);
    }
    if (!emailErrorRegex && !usernameErrorRegex) {
      await user.register(email, username);
      toggleOpen();
      navigation.navigate('/home');
    }
  };

  return !open ? (
    <DialogTitle id="login-dialog-title" className={classes.title}>
      Log In
      <DialogContent className={classes.content}>
        <CustomTextField
          id="filled-email"
          label="Email"
          required
          error={emailError}
          className={classes.textField}
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          variant="filled"
          helperText={emailError && 'Invalid email'}
        />
        <Button onClick={flip}>
          <Typography color="secondary" className={classes.flip}>
            No account? Sign up here.
          </Typography>
        </Button>
        <Button
          disabled={emailError}
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
  ) : (
    <DialogTitle id="login-dialog-title" className={classes.title}>
      Sign Up
      <DialogContent className={classes.content}>
        <CustomTextField
          id="filled-name"
          label="Email"
          required={true}
          error={emailError}
          className={classes.textField}
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          variant="filled"
          helperText={emailError && 'Invalid email'}
        />
        <CustomTextField
          id="filled-name"
          label="Username"
          required={true}
          error={usernameError}
          className={classes.textField}
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
          variant="filled"
          helperText={usernameError && 'Letters, digits, or underscores only.'}
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
          disabled={emailError || usernameError || !checked}
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
  );
};

export default LoginDialog;
