import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { UserCard, SettingsCard } from '../components';
import { UserSession } from '../api';

/**
 * UserGrid component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        flexWrap: 'nowrap',
        marginTop: '15vh',
        [theme.breakpoints.down('sm')]: {
          order: -1,
          marginTop: '10vh',
          marginBottom: '0 !important',
          paddingBottom: '0 !important'
        }
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
}

/**
 * User page column grid layout
 */
const UserGrid = ({ user }: UserGridProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      item
      container
      direction="column"
      spacing={2}
      xs={12}
      sm={10}
      md={4}
    >
      <Grid item>
        <UserCard user={user} />
      </Grid>
      <Grid className={classes.item} item>
        <SettingsCard user={user} />
      </Grid>
    </Grid>
  );
};

export default React.memo(UserGrid);
