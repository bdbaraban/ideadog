import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { UserCard, SettingsCard } from '../components';
import { UserSession } from '../api';
import { User } from '../types';

/**
 * UserGrid component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        flexWrap: 'nowrap'
      },
      item: {
        [theme.breakpoints.down('sm')]: {
          paddingBottom: 0
        }
      },
      card: {
        padding: theme.spacing(2),
        textAlign: 'left',
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
      }
    })
);

/**
 * UserGrid prop types
 */
interface UserGridProps {
  // Current user session
  user: UserSession;
  // Current user being viewed
  viewingUser: User | null;
}

/**
 * User page column grid layout
 */
const UserGrid = ({ user, viewingUser }: UserGridProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      item
      container
      direction="column"
      spacing={2}
      xs={12}
      sm={11}
      md={4}
    >
      <Grid item>
        <UserCard user={user} viewingUser={viewingUser} />
      </Grid>
      {user.current && viewingUser && viewingUser.key === user.current.key && (
        <Grid className={classes.item} item>
          <SettingsCard user={user} />
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(UserGrid);
