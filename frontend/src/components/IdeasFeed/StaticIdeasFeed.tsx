import React, { Dispatch, FC, ReactElement, SetStateAction } from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import IdeaCard from 'components/IdeaCard';

import { AppState } from 'store';
import { Idea } from 'types';

// StaticIdeasFeed component styles
const useStyles = makeStyles(() =>
  createStyles({
    gridItem: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    }
  })
);

// StaticIdeasFeed component prop types
interface StaticIdeasFeedProps {
  ideas: AppState['ideas'];
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Static feed of posted ideas for /idea or /user pages
 */
const StaticIdeasFeed: FC<StaticIdeasFeedProps> = ({
  ideas,
  setSnackbarOpen
}: StaticIdeasFeedProps) => {
  // Select Material-UI styles
  const classes = useStyles();

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

export default StaticIdeasFeed;
