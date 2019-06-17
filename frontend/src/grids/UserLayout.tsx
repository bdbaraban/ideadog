import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import { UserSession } from '../api';
import { IdeaGrid, UserGrid } from '.';
import { Idea, Tag, User } from '../types';

/**
 * UserLayout component styles
 */
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
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          margin: '0 auto'
        }
      }
    })
);

/**
 * UserLayout component prop types
 */
interface UserLayoutProps {
  // Current user session
  user: UserSession;

  // Current user being viewed
  viewingUser: User | null;

  // Array of current ideas
  ideas: Idea[];

  // Array of all available tags
  allTags: Tag[];
}

/**
 * User page layout grid
 */
const UserLayout = ({
  user,
  viewingUser,
  ideas,
  allTags
}: UserLayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={6} justify="center">
        <IdeaGrid
          user={user}
          self={
            user.current && viewingUser
              ? viewingUser.key === user.current.key
              : false
          }
          ideas={ideas}
          allTags={allTags}
        />
        <UserGrid user={user} viewingUser={viewingUser} />
      </Grid>
    </div>
  );
};

export default React.memo(UserLayout);
