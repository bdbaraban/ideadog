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
  AccountButton,
  AuthButton,
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
    logoLink: {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      textDecoration: 'none'
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
    }
  })
);

const ApplicationBar = (): ReactElement => {
  const classes = useStyles();
  const user = useSelector((state: AppState): UserState => state.user);

  return (
    <>
      <Hidden xsDown>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Link href="/home">
              <Box className={classes.logoLink}>
                <SvgIcon component={(): ReactElement => HappyTully(46)}>
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
        <Hidden smUp>
          <Box className={classes.logo}>
            <Link href="/home">
              <SvgIcon component={(): ReactElement => HappyTully(46)}>
                &nbsp;
              </SvgIcon>
            </Link>
          </Box>
          <Divider variant="middle" classes={{ middle: classes.divider }} />
        </Hidden>
        <Box className={classes.searchbar}>
          <Searchbar />
        </Box>
        <Divider variant="middle" classes={{ middle: classes.divider }} />
        {user.isAuthenticated ? (
          <>
            <Hidden xsDown>
              <Box className={classes.user}>
                <UserCard />
              </Box>
            </Hidden>
            <Hidden smUp>
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
            <AuthButton />
          </Box>
        )}
        <Divider variant="middle" classes={{ middle: classes.divider }} />
        <Box className={classes.sortSelect}>
          <SortSelect />
        </Box>
        <Hidden xsDown implementation="js">
          <Box className={classes.tagsCard}>
            <TagsCard />
          </Box>
        </Hidden>
        <Hidden smUp implementation="js">
          <Box className={classes.tagsCard}>
            <TagsSelect />
          </Box>
        </Hidden>
        <Divider variant="middle" classes={{ middle: classes.divider }} />
      </Drawer>
    </>
  );
};

export default ApplicationBar;
