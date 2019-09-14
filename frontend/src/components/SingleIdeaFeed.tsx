import React, {
  MouseEvent,
  ReactElement,
  SyntheticEvent,
  useState
} from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IdeaCard } from 'components';
import { useSelector } from 'react-redux';
import { AppState } from 'store';

// IdeaFeed component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      height: `calc(100% - 64px)`,
      left: 0,
      marginTop: 64,
      overflowY: 'auto',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: 0
      },
      '-ms-overflow-style': 'none',
      position: 'fixed',
      width: `calc(100vw - 375px)`,
      [theme.breakpoints.down('sm')]: {
        width: `calc(100vw - 300px)`
      },
      [theme.breakpoints.down('xs')]: {
        height: '100%',
        marginTop: 0,
        width: `calc(100vw - 68px)`
      }
    },
    grid: {
      marginBottom: theme.spacing(2),
      marginLeft: 0,
      marginRight: 0,
      marginTop: theme.spacing(2)
    },
    gridItem: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    },
    status: {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      justifyContent: 'center'
    },
    snackbarContent: {
      alignItems: 'center',
      backgroundColor: theme.palette.secondary.main,
      display: 'flex',
      fontWeight: 'bold',
      justifyContent: 'center'
    }
  })
);

/**
 * Grid for rendering single idea
 */
const IdeaFeed = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select ideas from Redux store
  const ideas = useSelector(
    (state: AppState): AppState['ideas'] => state.ideas
  );

  // Comment posted snackbar open/closed status
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Close comment posted snackbar
  const handleClose = (
    _: SyntheticEvent | MouseEvent,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          alignContent="flex-start"
          justify="center"
          spacing={2}
        >
          <Grid
            container
            item
            xs={12}
            sm={10}
            lg={8}
            justify="center"
            spacing={2}
            className={classes.gridItem}
          >
            <Grid item xs={12} classes={{ item: classes.gridItem }}>
              <IdeaCard idea={ideas.all[0]} setSnackbarOpen={setSnackbarOpen} />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'idea-deleted-message',
          className: classes.snackbarContent
        }}
        message={
          <span id="idea-deleted-message">
            Comment posted!
            <span role="img" aria-label="speech-balloon">
              💬
            </span>
          </span>
        }
      />
    </>
  );
};

export default IdeaFeed;
