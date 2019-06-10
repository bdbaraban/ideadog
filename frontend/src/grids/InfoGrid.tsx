import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, Hidden, makeStyles, createStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { UserCard, TagsCard, AboutCard } from '../components';
import { Tag, UserAuth } from '../api';

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

interface InfoGridProps {
  currentTags: string[];
  allTags: Tag[];
  user: UserAuth;
}

const InfoGrid = ({
  currentTags,
  allTags,
  user
}: InfoGridProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Hidden smDown>
      <Grid
        container
        item
        className={classes.root}
        direction="column"
        xs={4}
        spacing={2}
      >
        <Grid item>
          <UserCard user={user} />
        </Grid>
        <Grid item>
          <TagsCard currentTags={currentTags} allTags={allTags} />
        </Grid>
        <Grid item>
          <AboutCard />
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default InfoGrid;
