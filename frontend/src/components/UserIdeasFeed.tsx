import React, { ReactElement, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IdeaCard, NewIdeaCard, UserGridCard } from 'components';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { IdeasState } from 'store/ideas/types';
import { UserState } from 'store/user/types';
import { Idea, User } from 'types';

// IdeaFeed component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      height: `calc(100% - 64px)`,
      left: 0,
      marginTop: 64,
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: 0
      },
      '-ms-overflow-style': 'none',
      position: 'fixed',
      width: `calc(100vw - 375px)`,
      [theme.breakpoints.down('sm')]: {
        width: `calc(100vw - 300px)`
      },
      [theme.breakpoints.down('xs')]: {
        height: '100%',
        marginTop: 0,
        width: `calc(100vw - 68px)`
      }
    },
    grid: {
      marginBottom: theme.spacing(2),
      marginLeft: 0,
      marginRight: 0,
      marginTop: theme.spacing(2)
    },
    gridItem: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    },
    snackbarContent: {
      alignItems: 'center',
      backgroundColor: theme.palette.error.main,
      display: 'flex',
      fontWeight: 'bold',
      justifyContent: 'center'
    }
  })
);

// UserIdeasFeed component prop types
interface UserIdeasFeedProps {
  user: User; // Current user being viewed
}

/**
 * Feed of ideas for given user
 */
const UserIdeasFeed = ({ user }: UserIdeasFeedProps): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select logged in user from Redux store
  const loggedInUser = useSelector((state: AppState): UserState => state.user);

  // Select relevant state from Redux store
  const ideas = useSelector((state: AppState): IdeasState => state.ideas);

  // Snackbar open/closed status
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Close idea deleted snackbar
  const handleClose = (
    _: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          alignContent="flex-start"
          justify="center"
          spacing={2}
        >
          {user.key === loggedInUser.profile.key ? (
            <Grid item xs={12} sm={10} lg={8} className={classes.gridItem}>
              <NewIdeaCard />
            </Grid>
          ) : (
            <Grid item xs={12} sm={10} lg={8} className={classes.gridItem}>
              <UserGridCard user={user} />
            </Grid>
          )}
          <Grid
            container
            item
            xs={12}
            sm={10}
            lg={8}
            justify="center"
            spacing={2}
            className={classes.gridItem}
          >
            {ideas.all.map(
              (idea: Idea, index: number): ReactElement => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  classes={{ item: classes.gridItem }}
                >
                  <IdeaCard idea={idea} setSnackbarOpen={setSnackbarOpen} />
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'idea-deleted-message',
          className: classes.snackbarContent
        }}
        message={
          <span id="idea-deleted-message">
            Idea deleted.
            <span role="img" aria-label="wastebasket">
              🗑️
            </span>
          </span>
        }
      />
    </>
  );
};

export default UserIdeasFeed;
