import React from 'react';
import { createStyles, Hidden, makeStyles, Theme } from '@material-ui/core';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import NewIdea from '../components/NewIdea/NewIdea';
import IdeaCard from '../components/IdeaCard';
import { Idea } from '../api/useIdeas';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        alignContent: 'center',
        flexGrow: 1,
        flexWrap: 'nowrap',
        marginTop: '15vh',
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap'
        }
      }
    })
);

const IdeaGrid = (props: {
  ideas: Idea[];
  allTags: string[];
}): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      className={classes.root}
      direction="column"
      xs={6}
      spacing={2}
    >
      <Hidden xsDown>
        <Grid item>
          <NewIdea allTags={props.allTags} />
        </Grid>
      </Hidden>
      {props.ideas.map(
        (idea: Idea): React.ReactElement => {
          return (
            <Grid item key={idea.id}>
              <IdeaCard idea={idea} />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default IdeaGrid;
