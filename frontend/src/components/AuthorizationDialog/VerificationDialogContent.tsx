import React from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import { CustomTextField } from '..';

/**
 * VerificationDialogContent component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: theme.spacing(1),
        height: 'min-content',
        width: '65%',
        [theme.breakpoints.down('sm')]: {
          width: '100%'
        }
      },
      title: {
        marginTop: 8,
        marginBottom: 8,
        fontWeight: 'bold'
      },
      textField: {
        marginTop: 8
      },
      text: {
        color: fade(theme.palette.common.white, 0.5),
        textAlign: 'center',
        paddingTop: 8
      },
      button: {
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 16
      }
    })
);

/**
 * VerificationDialogContent component prop types
 */
interface VerificationDialogContentProps {
  // Verify login/signup function
  handleVerification: (verificationCode: string) => void;
}

/**
 * Verification code input dialog
 */
const VerificationDialogContent = ({
  handleVerification
}: VerificationDialogContentProps): React.ReactElement => {
  const classes = useStyles();

  // Verification code
  const [verificationCode, setVerificationCode] = React.useState<string>('');

  // Register verification code input
  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setVerificationCode(event.target.value);
  };

  // Enable enter-key submission
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleVerification(verificationCode);
      event.preventDefault();
    }
  };

  return (
    <div className={classes.root}>
      <CustomTextField
        className={classes.textField}
        id="filled-verification-code"
        label="Code"
        autoFocus
        required
        value={verificationCode}
        onChange={handleVerificationCodeChange}
        margin="normal"
        variant="filled"
        onKeyPress={handleKeyPress}
      />
      <Button
        className={classes.button}
        disabled={verificationCode.length !== 6}
        variant="contained"
        color="secondary"
        size="large"
        onClick={(): void => handleVerification(verificationCode)}
      >
        Verify
      </Button>
      <Typography className={classes.title} color="textSecondary" variant="h6">
        Check your email!
      </Typography>
      <Typography className={classes.text}>
        A verification code has been sent to your email. Post the code in the
        input field above to complete authentication for your account.
      </Typography>
    </div>
  );
};

export default React.memo(VerificationDialogContent);
