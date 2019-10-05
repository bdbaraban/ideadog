import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import PersonIcon from '@material-ui/icons/Person';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// AuthButton component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1)
      }
    }
  })
);

// AuthButton component prop types
interface AuthButtonProps {
  handleClick: VoidFunction;
}

/**
 * Button to open/close login and signup dialogs
 */
const AuthButton: FC<AuthButtonProps> = ({ handleClick }: AuthButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <>
      <Hidden xsDown implementation="css">
        <Box className={classes.box}>
          <Fab
            color="secondary"
            variant="extended"
            size="medium"
            aria-label="login/signup"
            onClick={handleClick}
          >
            <PersonIcon />
            Log in/Sign up
          </Fab>
        </Box>
      </Hidden>
      <Hidden smUp implementation="css">
        <Box className={classes.box}>
          <Fab
            color="secondary"
            size="small"
            aria-label="login/signup"
            onClick={handleClick}
          >
            <PersonIcon />
          </Fab>
        </Box>
      </Hidden>
    </>
  );
};

export default AuthButton;
