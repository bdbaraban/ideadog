import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import { Idea } from '../api';
import { IdeaCard } from '../components';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center'
      },
      grid: {
        marginTop: '15vh',
        width: '100%',
        [theme.breakpoints.up('md')]: {
          paddingRight: 24
        }
      }
    })
);

interface IdeaLayoutProps {
  idea: Idea;
}

const IdeaLayout = ({ idea }: IdeaLayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={6} justify="center">
        <Grid item xs={12} md={8}>
          <IdeaCard idea={idea} />
        </Grid>
      </Grid>
    </div>
  );
};

export default IdeaLayout;
