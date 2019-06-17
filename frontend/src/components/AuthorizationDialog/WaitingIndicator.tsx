import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * WaitingIndicator component style
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
      progress: {
        marginTop: 8,
        marginBottom: 8
      },
      title: {
        marginTop: 8,
        marginBottom: 8,
        fontWeight: 'bold'
      },
      text: {
        color: fade(theme.palette.common.white, 0.5),
        textAlign: 'center',
        paddingTop: 8
      }
    })
);

/**
 * Waiting indicator component displayed while awaiting login/signup response
 */
const WaitingIndicator = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.progress}
        color="secondary"
        size={60}
      />
      <Typography className={classes.title} color="textSecondary" variant="h6">
        Check your email!
      </Typography>
      <Typography className={classes.text}>
        A magic sign-in link has been sent to your email. Click the link in the
        email to verify your account and sign in.
      </Typography>
    </div>
  );
};

export default React.memo(WaitingIndicator);
