import React from 'react';
import { Idea } from 'api';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IdeaCard } from '../cards';
import { Styles } from 'jss';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
      }
    })
);

interface IdeaGridItemProps {
  idea: Idea;
}

const IdeaGridItem = ({ idea }: IdeaGridItemProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      {idea && <IdeaCard idea={idea} />}
    </Grid>
  );
};

export default IdeaGridItem;
