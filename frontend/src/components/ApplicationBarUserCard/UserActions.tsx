import React, { FC } from 'react';
import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// UserActions component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    button: {
      color: theme.palette.common.white
    }
  })
);

// UserActions component prop types
interface UserActionsProps {
  userKey: string;
}

/**
 * Buttons to view profile and log out
 */
const UserActions: FC<UserActionsProps> = ({ userKey }: UserActionsProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select Next router
  const router = useRouter();

  // Redirect to user page
  const redirectToUser = (): void => {
    router.push(`/user/${userKey}`);
  };

  // Log user out
  const logout = (): void => {
    router.push(`/logout`);
  };

  return (
    <CardActions className={classes.cardActions}>
      {router.pathname !== 'user' && (
        <Button
          size="small"
          className={classes.button}
          onClick={redirectToUser}
        >
          View Profile
        </Button>
      )}
      <Button size="small" className={classes.button} onClick={logout}>
        Log Out
      </Button>
    </CardActions>
  );
};

export default UserActions;
