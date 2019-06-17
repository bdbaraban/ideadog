import React from 'react';
import {
  createStyles,
  Hidden,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import VirtualizedList from '@dwqs/react-virtual-list';
import { useCurrentRoute } from 'react-navi';
import { IdeaGridItem, NewIdeaCard } from '../components';
import { UserSession } from '../api';
import { Idea, Tag } from '../types';

/**
 * IdeaGrid component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      rootDefault: {
        alignContent: 'center',
        flexGrow: 1,
        flexWrap: 'nowrap',
        marginTop: '15vh',
        [theme.breakpoints.down('md')]: {
          marginTop: '12vh'
        },
        [theme.breakpoints.down('sm')]: {
          marginTop: '10vh',
          paddingTop: '0 !important'
        }
      },
      rootUser: {
        alignContent: 'center',
        flexGrow: 1,
        flexWrap: 'nowrap',
        marginTop: '15vh',
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap',
          order: 1,
          marginTop: 0,
          paddingTop: '0 !important'
        }
      },
      list: {
        scrollbarWidth: 'none',
        overflow: '-moz-scrollbars-none',
        '&::-webkit-scrollbar': {
          width: 0
        },
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: '100%'
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

/**
 * VirtualizedList renderItem function parameter types
 */
interface RenderItemParams {
  // Index
  [key: string]: number;
}

/**
 * IdeaGrid prop types
 */
interface IdeaGridProps {
  // Current user session
  user: UserSession;

  // True/false indicating if page is for current user
  self: boolean;

  // Array of current ideas
  ideas: Idea[];

  // Array of all available tags
  allTags: Tag[];
}

/**
 * Infinite scrolling column grid of ideas
 */
const IdeaGrid = ({
  user,
  self,
  ideas,
  allTags
}: IdeaGridProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();

  // Current ideas to display, tracks state changes based on received ideas prop
  const [, setCurrentIdeas] = React.useState<Idea[]>([]);
  React.useEffect((): void => {
    setCurrentIdeas(ideas);
  }, [ideas]);

  // Circular progress indicator to display during ideas loading
  const onLoading = (): React.ReactElement => {
    return (
      <div className={classes.container}>
        <CircularProgress color="secondary" />
      </div>
    );
  };

  // Text div to display upon having displayed all ideas
  const onEnded = (): React.ReactElement => {
    return (
      <div className={classes.container}>
        <Typography className={classes.typography} color="textSecondary">
          No bamboozle, there are no more ideas.
        </Typography>
      </div>
    );
  };

  // Text div to display when there are no ideas to display
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
      className={
        route.url.href.startsWith('/user')
          ? classes.rootUser
          : classes.rootDefault
      }
      item
      container
      direction="column"
      spacing={2}
      xs={12}
      sm={10}
      md={7}
      lg={6}
    >
      {self && (
        <Hidden smDown>
          <Grid item>
            <NewIdeaCard allTags={allTags} user={user} />
          </Grid>
        </Hidden>
      )}
      <VirtualizedList
        className={classes.list}
        itemCount={ideas.length}
        overscanCount={15}
        useWindow={false}
        height={1000}
        onLoading={onLoading}
        onEnded={onEnded}
        noContentRenderer={noContentRenderer}
        renderItem={({ index }: RenderItemParams): React.ReactElement => (
          <IdeaGridItem idea={ideas[index]} />
        )}
      />
    </Grid>
  );
};

export default React.memo(IdeaGrid);
