import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { CustomDivider, HappyTully, Link } from 'components/common';
import { ApplicationBarProps } from './ApplicationBarContainer';
import DRAWER_WIDTH from './DRAWER_WIDTH';
import NewIdeaButton from 'components/NewIdeaButton';
import AboutComponent from 'components/AboutComponent';
import AuthComponent from 'components/AuthComponent';
import SortSelect from 'components/SortSelect';
import TagsSelect from 'components/TagsSelect';
import SearchComponent from 'components/SearchComponent';
import UserComponent from 'components/UserComponent';

// RightDrawer component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      width: DRAWER_WIDTH.md,
      [theme.breakpoints.down('sm')]: {
        width: DRAWER_WIDTH.sm
      },
      [theme.breakpoints.down('xs')]: {
        width: DRAWER_WIDTH.xs
      }
    },
    drawerPaper: {
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
      overflowX: 'hidden',
      padding: theme.spacing(2),
      width: DRAWER_WIDTH.md,
      [theme.breakpoints.down('sm')]: {
        width: DRAWER_WIDTH.sm
      },
      [theme.breakpoints.down('xs')]: {
        width: DRAWER_WIDTH.xs
      }
    },
    toolbar: {
      minHeight: 48,
      minWidth: 48
    },
    logo: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  })
);

// RightDrawer component prop types
interface RightDrawerProps extends ApplicationBarProps {
  isAuthenticated: boolean; // Whether user is logged in
}

/**
 * Permanent right toolbar
 */
const RightDrawer: FC<RightDrawerProps> = ({
  search,
  filters,
  isAuthenticated
}: RightDrawerProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      elevation={64}
      variant="permanent"
      anchor="right"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Grid container spacing={2} justify="center">
        {/* Logo */}
        <Hidden smUp implementation="css">
          <Grid item xs={12}>
            <Box className={classes.logo}>
              <Link href="/home">
                <HappyTully size={46} id="MobileLogo" />
              </Link>
            </Box>
          </Grid>
        </Hidden>

        {/* Search actions */}
        {search ? (
          <>
            <Hidden smUp>
              <Grid item xs={12}>
                <CustomDivider />
              </Grid>
            </Hidden>
            <Grid item xs={12}>
              <SearchComponent />
            </Grid>
          </>
        ) : (
          <Hidden xsDown implementation="css">
            <div className={classes.toolbar} />
          </Hidden>
        )}

        <Grid item xs={12}>
          <CustomDivider />
        </Grid>

        {/* User actions */}
        {isAuthenticated ? (
          <>
            <Grid item xs={12}>
              <UserComponent />
            </Grid>
            <Grid item xs={12}>
              <NewIdeaButton />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <AuthComponent />
          </Grid>
        )}

        <Grid item xs={12}>
          <CustomDivider />
        </Grid>

        {/* Idea filtering actions */}
        {filters && (
          <>
            <Grid item xs={12}>
              <SortSelect />
            </Grid>
            <Grid item xs={12}>
              <TagsSelect />
            </Grid>
            <Grid item xs={12}>
              <CustomDivider />
            </Grid>
          </>
        )}

        {/* Contact and FAQ buttons */}
        <Grid item xs={12}>
          <AboutComponent />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default RightDrawer;
