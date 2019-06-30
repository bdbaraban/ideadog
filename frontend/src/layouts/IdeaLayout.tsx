import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import { UserSession } from '../api';
import { IdeaCard } from '../components';
import { Idea } from '../types';

/**
 * IdeaLayout component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center'
      },
      grid: {
        width: '100%',
        marginTop: 72,
        [theme.breakpoints.down('sm')]: {
          marginTop: 66
        }
      }
    })
);

/**
 * IdeaLayout component props
 */
interface IdeaLayoutProps {
  // Current user session
  user: UserSession;
  // Current idea
  idea: Idea;
}

/**
 * Grid layout for the single-idea page
 */
const IdeaLayout = ({ user, idea }: IdeaLayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={6} justify="center">
        <Grid item xs={12} sm={11} md={7}>
          <IdeaCard user={user} idea={idea} />
        </Grid>
      </Grid>
    </div>
  );
};

export default IdeaLayout;
