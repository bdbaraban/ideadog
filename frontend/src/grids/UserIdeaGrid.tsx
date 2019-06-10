import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import VirtualizedList from '@dwqs/react-virtual-list';
import { IdeaGridItem } from '../components';
import { Idea } from '../api';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        alignContent: 'center',
        flexGrow: 1,
        flexWrap: 'nowrap',
        marginTop: '15vh',
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap'
        }
      },
      list: {
        scrollbarWidth: 'none',
        overflow: '-moz-scrollbars-none',
        '&::-webkit-scrollbar': {
          width: 0
        },
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
      },
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
      },
      typography: {
        textAlign: 'center'
      }
    })
);

interface UserIdeaGridProps {
  ideas: Idea[];
}

const UserIdeaGrid = ({ ideas }: UserIdeaGridProps): React.ReactElement => {
  const classes = useStyles();

  const onLoading = (): React.ReactElement => {
    return (
      <div className={classes.container}>
        <CircularProgress color="secondary" />
      </div>
    );
  };

  const onEnded = (): React.ReactElement => {
    return (
      <div className={classes.container}>
        <Typography className={classes.typography} color="textSecondary">
          No bamboozle, there are no more ideas.
        </Typography>
      </div>
    );
  };

  const noContentRenderer = (): React.ReactElement => {
    return (
      <div className={classes.container}>
        <Typography className={classes.typography} color="textSecondary">
          No ideas, such empty.
        </Typography>
      </div>
    );
  };

  return (
    <Grid
      container
      item
      className={classes.root}
      direction="column"
      xs={12}
      sm={10}
      md={6}
      spacing={2}
    >
      <VirtualizedList
        className={classes.list}
        itemCount={ideas.length}
        overscanCount={15}
        useWindow={false}
        height={800}
        onLoading={onLoading}
        onEnded={onEnded}
        noContentRenderer={noContentRenderer}
        renderItem={({
          index
        }: {
          [key: string]: number;
        }): React.ReactElement => <IdeaGridItem idea={ideas[index]} />}
      />
    </Grid>
  );
};

export default UserIdeaGrid;
