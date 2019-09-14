import React, {
  MouseEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
  useRef
} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IdeaCard, NewIdeaCard } from 'components';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { fetchIdeas } from 'store/ideas/actions';
import { Idea } from 'types';

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

/**
 * Feed of posted ideas
 */
const IdeasFeed = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Redux 'mapDispatch'
  const dispatch = useThunkDispatch();

  // Select relevant state from Redux store
  const { ideas, sort, search, tags, user } = useSelector(
    (state: AppState): AppState => state
  );

  // Mutable ref tracking whether component is on first render
  const firstRender = useRef<boolean>(true);

  // Idea deleted snackbar open/closed status
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Memoize conversion of tags into API query format
  const memoizedTags = useMemo(
    (): string =>
      Object.keys(tags.selected)
        .reduce((query: string, tag: string): string => `${query}${tag},`, '')
        .replace(/(,$)/g, ''),
    [tags.selected]
  );

  useEffect((): void => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    dispatch(fetchIdeas(sort.current.key, search.query, memoizedTags));
  }, [dispatch, search, sort, memoizedTags]);

  // Close idea deleted snackbar
  const handleClose = (
    _: SyntheticEvent | MouseEvent,
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
          {user.isAuthenticated && (
            <Grid item xs={12} sm={10} lg={8} className={classes.gridItem}>
              <NewIdeaCard />
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
          <Grid item xs={12} sm={10} lg={8} className={classes.gridItem}>
            <Box className={classes.status}>
              <Typography variant="body1">{ideas.status}</Typography>
            </Box>
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

export default IdeasFeed;
