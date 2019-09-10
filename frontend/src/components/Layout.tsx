import React, { HTMLAttributes, ReactElement, PropsWithChildren } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ApplicationBar, NewIdeaDialog } from 'components';

// Layout component styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

/**
 * Site body layout wrapper
 */
const Layout = ({
  children
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        <ApplicationBar />
      </header>
      <main>
        <NewIdeaDialog />
        {children}
      </main>
    </div>
  );
};

export default Layout;
