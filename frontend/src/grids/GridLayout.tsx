import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import { Idea } from '../api/useIdeas';
import IdeaGrid from './IdeaGrid';
import InfoGrid from './InfoGrid';

const useStyles = makeStyles(
  (): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center'
      },
      grid: {
        width: '100%'
      }
    })
);

interface GridLayoutProps {
  ideas: Idea[];
  currentTags: string[];
  allTags: string[];
}

const GridLayout = ({
  ideas,
  currentTags,
  allTags
}: GridLayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={6} justify="center">
        <IdeaGrid ideas={ideas} allTags={allTags} />
        <InfoGrid currentTags={currentTags} allTags={allTags} />
      </Grid>
    </div>
  );
};

export default GridLayout;
