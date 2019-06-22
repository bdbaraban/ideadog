import React from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, Hidden, makeStyles, Theme } from '@material-ui/core';
import { Styles } from 'jss';
import { AboutCard, TagsCard, UserCard } from '../components';
import { UserSession } from '../api';
import { CheckboxTag } from '../types';

/**
 * InfoGrid component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        flexWrap: 'nowrap',
        [theme.breakpoints.down('sm')]: {
          paddingTop: '8px !important'
        }
      }
    })
);

/**
 * InfoGrid component prop types
 */
interface InfoGridProps {
  // Current user session
  user: UserSession;

  // Array of currently-checked tag names
  checkboxTags: CheckboxTag[];
}

/**
 * Right column grid of info cards, only displays on desktop
 */
const InfoGrid = ({
  user,
  checkboxTags
}: InfoGridProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      item
      container
      direction="column"
      spacing={2}
      xs={12}
      sm={11}
      md={5}
      lg={4}
    >
      <Hidden smDown>
        <Grid item>
          <UserCard user={user} viewingUser={null} />
        </Grid>
        <Grid item>
          <TagsCard checkboxTags={checkboxTags} />
        </Grid>
      </Hidden>
      <Grid item>
        <AboutCard />
      </Grid>
    </Grid>
  );
};

export default InfoGrid;
