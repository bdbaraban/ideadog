import React, { FC, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { CustomSnackbar } from 'components/common';
import NewIdeaCard from 'components/NewIdeaCard';
import UserGridCard from 'components/UserGridCard';
import LiveIdeasFeed from './LiveIdeasFeed';
import StaticIdeasFeed from './StaticIdeasFeed';

import { useIdeasState, useSnackbar } from 'hooks';
import { User } from 'types';

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
    status: {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center'
    }
  })
);

// IdeasFeedContainer component prop types
interface IdeasFeedContainerProps {
  viewingUser?: User;
}

/**
 * Wraps feed of posted ideas
 */
const IdeasFeedContainer: FC<IdeasFeedContainerProps> = ({
  viewingUser
}: IdeasFeedContainerProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select Next router
  const router = useRouter();

  // Select ideas Redux store
  const { all, message, status } = useIdeasState();

  // Idea deleted snackbar state
  const { snackbarOpen, setSnackbarOpen, handleSnackbarClose } = useSnackbar();

  // Flash snackbar for 5 seconds
  const flashSnackbar = useRef((): void => {
    setSnackbarOpen(true);
    setTimeout((): void => {
      setSnackbarOpen(false);
    }, 5000);
  });

  useEffect((): void => {
    if (message !== '') {
      console.log('trigger');
      flashSnackbar.current();
    }
  }, [message]);

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
          {!router.pathname.startsWith('/idea') && viewingUser === undefined && (
            <Grid item xs={12} sm={10} lg={8} className={classes.gridItem}>
              <NewIdeaCard />
            </Grid>
          )}

          {router.pathname.startsWith('/user') && viewingUser !== undefined && (
            <Grid item xs={12} sm={10} lg={8} className={classes.gridItem}>
              <UserGridCard viewingUser={viewingUser} />
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
            {router.pathname.startsWith('/home') ? (
              <LiveIdeasFeed ideas={all} />
            ) : (
              <StaticIdeasFeed ideas={all} />
            )}
          </Grid>

          {!router.pathname.startsWith('/idea') && (
            <Grid item xs={12} sm={10} lg={8} className={classes.gridItem}>
              <Box className={classes.status}>
                <Typography variant="body1">{status}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </div>

      <CustomSnackbar
        label="idea-action-message"
        color={message.startsWith('Fail') ? 'error' : 'secondary'}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={message}
      />
    </>
  );
};

export default IdeasFeedContainer;
