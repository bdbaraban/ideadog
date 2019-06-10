import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import { Idea, UserAuth } from '../api';
import { UserIdeaGrid, UserGrid } from '.';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      },
      grid: {
        width: '100%'
      }
    })
);

interface UserLayoutProps {
  ideas: Idea[];
  user: UserAuth;
}

const UserLayout = ({ ideas, user }: UserLayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={6} justify="center">
        <UserIdeaGrid ideas={ideas} />
        <UserGrid user={user} />
      </Grid>
    </div>
  );
};

export default UserLayout;
