import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useRef
} from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import IdeaCard from 'components/IdeaCard';

import { AppState, useThunkDispatch } from 'store';
import { fetchIdeas } from 'store/ideas';
import { useAppState } from 'hooks';
import { Idea } from 'types';

// IdeaFeed component styles
const useStyles = makeStyles(() =>
  createStyles({
    gridItem: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    }
  })
);

// LiveIdeasFeed component prop types
interface LiveIdeasFeedProps {
  ideas: AppState['ideas'];
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Feed of posted ideas that hot updates on filter actions
 */
const LiveIdeasFeed: FC<LiveIdeasFeedProps> = ({
  ideas,
  setSnackbarOpen
}: LiveIdeasFeedProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Redux 'mapDispatch'
  const dispatch = useThunkDispatch();

  // Select filters state from Redux store
  const { sort, search, tags } = useAppState();

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
    <>
      {ideas.all.map(
        (idea: Idea, index: number): ReactElement => (
          <Grid key={index} item xs={12} classes={{ item: classes.gridItem }}>
            <IdeaCard idea={idea} setSnackbarOpen={setSnackbarOpen} />
          </Grid>
        )
      )}
    </>
  );
};

export default LiveIdeasFeed;
