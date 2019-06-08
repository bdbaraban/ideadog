import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import { Idea, Tag } from '../api';
import { IdeaGrid, InfoGrid } from './';

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

interface HomeLayoutProps {
  ideas: Idea[];
  currentTags: string[];
  allTags: Tag[];
}

const HomeLayout = ({
  ideas,
  currentTags,
  allTags
}: HomeLayoutProps): React.ReactElement => {
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

export default HomeLayout;
