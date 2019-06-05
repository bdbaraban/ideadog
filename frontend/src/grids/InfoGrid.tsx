import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Theme, Hidden, makeStyles, createStyles } from '@material-ui/core';
import { Styles } from 'jss';
import UserCard from '../components/UserCard';
import TagsCard from '../components/TagsCard';
import AboutCard from '../components/AboutCard';

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

const InfoGrid = (props: {
  currentTags: string[];
  allTags: string[];
}): React.ReactElement => {
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
          <UserCard />
        </Grid>
        <Grid item>
          <TagsCard currentTags={props.currentTags} allTags={props.allTags} />
        </Grid>
        <Grid item>
          <AboutCard />
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default InfoGrid;
