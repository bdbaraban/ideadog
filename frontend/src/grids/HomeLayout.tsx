import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import { UserSession } from '../api';
import { CheckboxTag, Idea, Tag } from '../types';
import { IdeaGrid, InfoGrid } from '.';

/**
 * HomeLayout component styles
 */
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

/**
 * HomeLayout component prop types
 */
interface HomeLayoutProps {
  // Current user session
  user: UserSession;

  // Array of current ideas
  ideas: Idea[];

  // Array of all available tags
  allTags: Tag[];

  // Array of currently-checked tag names
  checkboxTags: CheckboxTag[];
}

/**
 * Home page layout grid
 */
const HomeLayout = ({
  user,
  ideas,
  allTags,
  checkboxTags
}: HomeLayoutProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={6} justify="center">
        <IdeaGrid user={user} ideas={ideas} allTags={allTags} />
        <InfoGrid user={user} checkboxTags={checkboxTags} />
      </Grid>
    </div>
  );
};

export default HomeLayout;
