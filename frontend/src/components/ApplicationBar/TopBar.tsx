import React, { FC } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { HappyTully, Link } from 'components/common';
import DRAWER_WIDTH from './DRAWER_WIDTH';

// TopBar component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginRight: DRAWER_WIDTH.md,
      width: `calc(100% - ${DRAWER_WIDTH.md}px)`,
      [theme.breakpoints.down('sm')]: {
        marginRight: DRAWER_WIDTH.sm,
        width: `calc(100% - ${DRAWER_WIDTH.sm}px)`
      }
    },
    title: {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      textDecoration: 'none'
    },
    text: {
      marginLeft: theme.spacing(1)
    }
  })
);

/**
 * Fixed Top bar with logo and title, displayed only on desktop
 */
const TopBar: FC<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Hidden xsDown implementation="css">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link href="/home">
            <Box className={classes.title}>
              <HappyTully size={46} id="TopAppBar" />
              <Typography className={classes.text} variant="h5" noWrap>
                IdeaDog
              </Typography>
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default TopBar;
