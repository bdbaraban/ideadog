import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import AboutButton from './AboutButton';
import ContactButton from './ContactButton';

// AboutBox component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    button: {
      [theme.breakpoints.down('xs')]: {
        paddingBottom: theme.spacing(2)
      }
    }
  })
);

/**
 * Wraps about and contact buttons
 */
const AboutComponentContainer: FC<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.button}>
        <AboutButton />
      </Box>
      <ContactButton />
    </Box>
  );
};

export default AboutComponentContainer;
