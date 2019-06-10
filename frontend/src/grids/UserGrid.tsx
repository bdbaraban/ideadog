import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { UserCard, SettingsCard } from '../components';
import { UserAuth } from '../api';

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

interface UserGridProps {
  user: UserAuth;
}

const UserGrid = ({ user }: UserGridProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      className={classes.root}
      direction="column"
      xs={12}
      sm={10}
      md={4}
      spacing={2}
    >
      <Grid item>
        <UserCard user={user} />
      </Grid>
      <Grid item>
        <SettingsCard user={user} />
      </Grid>
    </Grid>
  );
};

export default UserGrid;
