import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import { makeStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { Layout } from './layouts';
import { home } from './routes';
import { UserSession } from './api';

// Hide page scrollbars
const useStyles = makeStyles(
  (): Styles => ({
    '@global': {
      '*::-webkit-scrollbar': {
        width: 0
      },
      html: {
        scrollbarWidth: 'none',
        overflow: '-moz-scrollbars-none',
        '-ms-overflow-style': 'none'
      }
    }
  }),
  { name: 'MuiCssBaseline' }
);

/**
 * Entry point of IdeaDog React App
 */
const App = (): React.ReactElement => {
  useStyles();

  // Instantiate a new user session
  const user = new UserSession();

  return (
    <Router routes={home} context={{ user }}>
      <Layout>
        <Suspense fallback={null}>
          <View />
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
