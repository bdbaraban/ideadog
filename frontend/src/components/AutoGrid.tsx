import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Styles } from 'jss';

const styles = (theme: Theme): Styles => ({
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  grid: {
    width: '100%'
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'left',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
});

const AutoGrid = (props: Styles): React.ReactElement => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={6} justify="center">
        <Grid container item xs={6} direction="column" spacing={1}>
          <Grid item>
            <Card className={classes.card}>Idea 1</Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>Idea 2</Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>Idea 3</Card>
          </Grid>
        </Grid>
        <Grid container item xs={4} direction="column" spacing={2}>
          <Grid item>
            <Card className={classes.card}>Your info</Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>Tags</Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AutoGrid);
