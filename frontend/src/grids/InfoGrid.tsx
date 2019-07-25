import React from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, Hidden, makeStyles, Theme } from '@material-ui/core';
import { Styles } from 'jss';
import { AboutCard, ContactCard, TagsCard, UserCard } from '../components';
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
      md={4}
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
        <ContactCard
          title="Contact the Front-End Developer"
          name="Brennan D Baraban"
          image="https://media.licdn.com/dms/image/C5603AQHgatWc1KrFtQ/profile-displayphoto-shrink_200_200/0?e=1569456000&v=beta&t=HSuNhokI9UFgOU4gTDpexEfFbcXKlhoHTBhAykvXre8"
          github="https://github.com/bdbaraban"
          linkedin="https://linkedin.com/in/bdbaraban"
          portfolio="https://bdov.dev"
        />
      </Grid>
      <Grid item>
        <ContactCard
          title="Contact the Back-End Developer"
          name="Martin Smith"
          image="https://media.licdn.com/dms/image/C5603AQHKO34gDx0Gug/profile-displayphoto-shrink_800_800/0?e=1569456000&v=beta&t=LpydrJ3tylt7XToGOLNxHWO_8ax23Gtd52duOIfdVCk"
          github="https://github.com/Ostoyae"
          linkedin="https://www.linkedin.com/in/martin-smith-a40a17171/"
          portfolio="https://msmith.online"
        />
      </Grid>
      <Grid item>
        <AboutCard />
      </Grid>
    </Grid>
  );
};

export default InfoGrid;
