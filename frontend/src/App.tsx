import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import { makeStyles } from '@material-ui/core';
import { Styles } from 'jss';
import { Layout, routes } from './routes';
import { UserAuth } from './api';

const useStyles = makeStyles(
  (): Styles => ({
    '@global': {
      '*::-webkit-scrollbar': {
        width: 0
      },
      html: {
        scrollbarWidth: 'none',
        overflow: '-moz-scrollbars-none'
      }
    }
  }),
  { name: 'MuiCssBaseline' }
);

const App = (): React.ReactElement => {
  useStyles();

  const user = new UserAuth();

  return (
    <Router routes={routes} context={{ user }}>
      <Layout>
        <Suspense fallback={null}>
          <View />
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
