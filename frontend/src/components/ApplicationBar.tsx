import React, { ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  AboutButton,
  AccountButton,
  AuthorizationButton,
  ContactButton,
  HappyTully,
  Link,
  NewIdeaButton,
  Searchbar,
  SortSelect,
  TagsCard,
  TagsSelect,
  UserCard
} from 'components';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { UserState } from 'store/user/types';

// ApplicationBar component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginRight: 375,
      width: `calc(100% - 375px)`,
      [theme.breakpoints.down('sm')]: {
        marginRight: 300,
        width: `calc(100% - 300px)`
      }
    },
    appBarTitle: {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      textDecoration: 'none'
    },
    title: {
      marginLeft: theme.spacing(1)
    },
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      width: 375,
      [theme.breakpoints.down('sm')]: {
        width: 300
      },
      [theme.breakpoints.down('xs')]: {
        width: 75
      }
    },
    drawerPaper: {
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
      overflowX: 'hidden',
      padding: theme.spacing(2),
      width: 375,
      [theme.breakpoints.down('sm')]: {
        width: 300
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'center',
        display: 'flex',
        width: 75
      }
    },
    divider: {
      backgroundColor: theme.palette.secondary.main,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    logo: {
      marginBottom: theme.spacing(2)
    },
    searchbar: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
      }
    },
    user: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2)
    },
    authButton: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      textAlign: 'center'
    },
    newIdeaButton: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(3)
      }
    },
    loginButton: {
      fontWeight: 'bold'
    },
    sortSelect: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2)
    },
    tagsCard: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
    toolbar: {
      minHeight: 48
    },
    aboutContact: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-evenly',
      marginTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    aboutButton: {
      [theme.breakpoints.down('xs')]: {
        paddingBottom: theme.spacing(2)
      }
    }
  })
);

// ApplicationBar component prop types
interface ApplicationBarProps {
  search?: boolean; // Whether to display searchbar true/false
  filters?: boolean; // Whether to display sort and tag filters true/false
}

/**
 * App toolbar.
 *   -> On desktop: top bar and permanent right drawer
 *   -> On mobile: permanent right drawer only
 */
const ApplicationBar = ({
  search = true,
  filters = true
}: ApplicationBarProps): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select user state from Redux store
  const { isAuthenticated } = useSelector(
    (state: AppState): UserState => state.user
  );

  return (
    <>
      <Hidden xsDown implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Link href="/home">
              <Box className={classes.appBarTitle}>
                <SvgIcon
                  component={(): ReactElement =>
                    HappyTully(46, 'applicationBarDesktop')
                  }
                >
                  &nbsp;
                </SvgIcon>
                <Typography className={classes.title} variant="h5" noWrap>
                  IdeaDog
                </Typography>
              </Box>
            </Link>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Drawer
        className={classes.drawer}
        elevation={64}
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Hidden smUp implementation="css">
          <Box className={classes.logo}>
            <Link href="/home">
              <SvgIcon
                component={(): ReactElement =>
                  HappyTully(46, 'applicationBarMobile')
                }
              >
                &nbsp;
              </SvgIcon>
            </Link>
          </Box>
        </Hidden>
        {search ? (
          <>
            <Hidden smUp>
              <Divider variant="middle" classes={{ middle: classes.divider }} />
            </Hidden>
            <Box className={classes.searchbar}>
              <Searchbar />
            </Box>
          </>
        ) : (
          <Hidden xsDown implementation="css">
            <div className={classes.toolbar} />
          </Hidden>
        )}
        <Divider variant="middle" classes={{ middle: classes.divider }} />
        {isAuthenticated ? (
          <>
            <Hidden xsDown implementation="css">
              <Box className={classes.user}>
                <UserCard />
              </Box>
            </Hidden>
            <Hidden smUp implementation="css">
              <Box className={classes.user}>
                <AccountButton />
              </Box>
            </Hidden>
            <Box className={classes.newIdeaButton}>
              <NewIdeaButton />
            </Box>
          </>
        ) : (
          <Box className={classes.authButton}>
            <AuthorizationButton />
          </Box>
        )}
        <Divider variant="middle" classes={{ middle: classes.divider }} />
        {filters && (
          <>
            <Box className={classes.sortSelect}>
              <SortSelect />
            </Box>
            <Hidden xsDown implementation="css">
              <Box className={classes.tagsCard}>
                <TagsCard />
              </Box>
            </Hidden>
            <Hidden smUp implementation="css">
              <Box className={classes.tagsCard}>
                <TagsSelect />
              </Box>
            </Hidden>
            <Divider variant="middle" classes={{ middle: classes.divider }} />
          </>
        )}
        <Box className={classes.aboutContact}>
          <Box className={classes.aboutButton}>
            <AboutButton />
          </Box>
          <ContactButton />
        </Box>
      </Drawer>
    </>
  );
};

export default ApplicationBar;
