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
        marginTop: '15vh'
      },
      card: {
        padding: theme.spacing(2),
        textAlign: 'left',
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
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
    <Hidden smDown>
      <Grid
        className={classes.root}
        item
        container
        direction="column"
        spacing={2}
        xs={4}
      >
        <Grid item>
          <UserCard user={user} />
        </Grid>
        <Grid item>
          <TagsCard checkboxTags={checkboxTags} />
        </Grid>
        <Grid item>
          <AboutCard />
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default React.memo(InfoGrid);
