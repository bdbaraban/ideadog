import React from 'react';
import { useLoadingRoute } from 'react-navi';
import { LinearProgress, makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { Styles } from 'jss';
import { ErrorBoundary } from './';

const useStyles = makeStyles(
  (): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 2,
        backgroundColor: 'transparent'
      }
    })
);

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps): React.ReactElement => {
  const classes = useStyles();
  const loadingRoute = useLoadingRoute();

  return (
    <div>
      {loadingRoute && (
        <LinearProgress className={classes.root} color="secondary" />
      )}
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;
