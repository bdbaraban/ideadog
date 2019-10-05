import React, { FC } from 'react';

import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {
  CustomDialogContent,
  CustomDialogTitle,
  Emoji
} from 'components/common';

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
      color: theme.palette.common.white,
      width: '70%',
      [theme.breakpoints.down('xs')]: {
        width: '90%'
      }
    }
  })
);

/**
 * Confirmation dialog displayed after submitting login/signup request
 */
const VerificationDialog: FC<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <>
      <CustomDialogTitle id="verification-dialog-title">
        CHECK YOUR EMAIL!
      </CustomDialogTitle>
      <CustomDialogContent>
        <EmailIcon className={classes.icon} color="secondary" />
        <Typography className={classes.text} align="center" variant="body1">
          A magic account verification link has been sent to the given email.
          Open the link within this current browser to sign in and share some
          bright ideas!
          <br />
          <br />
          If you do not receive the email in your primary inbox, please check
          your spam folder <Emoji symbol="🙂" label="slightly-smiling-face" />.
        </Typography>
      </CustomDialogContent>
    </>
  );
};

export default VerificationDialog;
