import React from 'react';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { Idea } from '../../types';
import { IdeaCard } from '../cards';

/**
 * IdeaGridItem component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
      }
    })
);

/**
 * IdeaGridItem component prop types
 */
interface IdeaGridItemProps {
  // Current idea
  idea: Idea;
}

/**
 * Generic grid item component for infinite scrolling list in IdeaGrid
 */
const IdeaGridItem = ({ idea }: IdeaGridItemProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      {idea && <IdeaCard idea={idea} />}
    </Grid>
  );
};

export default React.memo(IdeaGridItem);
