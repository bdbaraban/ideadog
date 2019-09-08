import React, { ReactElement } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

// VerificationDialog component style
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
    icon: {
      fontSize: '3rem',
      marginBottom: theme.spacing(2)
    },
    text: {
      color: theme.palette.common.white
    }
  })
);

/**
 * Confirmation dialog displayed after submitting login/signup request
 */
const VerificationDialog = (): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <DialogTitle id="login-dialog-title" className={classes.title}>
        CHECK YOUR EMAIL!
      </DialogTitle>
      <DialogContent className={classes.content}>
        <EmailIcon className={classes.icon} color="secondary" />
        <Typography className={classes.text} align="center" variant="body1">
          A magic account verification link has been sent to the given email.
          Click the link to sign in and share some bright ideas!
        </Typography>
      </DialogContent>
    </>
  );
};

export default VerificationDialog;
