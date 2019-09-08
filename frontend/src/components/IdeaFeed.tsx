import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IdeaCard, NewIdeaCard } from 'components';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { fetchIdeas } from 'store/ideas/actions';
import { UserState } from 'store/user/types';
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
      marginTop: theme.spacing(2)
    },
    idea: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    }
  })
);

/**
 * Feed of posted ideas
 */
const IdeaFeed = (): ReactElement => {
  // Component styles
  const classes = useStyles();

  // Select user from Redux store
  const user = useSelector((state: AppState): UserState => state.user);

  // Select relevant state from Redux store
  const { ideas, sort, search, tags } = useSelector(
    (state: AppState): AppState => state
  );

  // Redux 'mapDispatch'
  const dispatch = useThunkDispatch();

  // Mutable ref tracking whether component is on first render
  const firstRender = useRef<boolean>(true);

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

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        alignContent="flex-start"
        justify="center"
        spacing={2}
      >
        {user.isAuthenticated && (
          <Grid item xs={12} sm={10} lg={8}>
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
        >
          {ideas.all.map(
            (idea: Idea, index: number): ReactElement => (
              <Grid key={index} item xs={12} classes={{ item: classes.idea }}>
                <IdeaCard idea={idea} />
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default IdeaFeed;
