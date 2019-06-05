import React, { Suspense } from 'react';
import { Router, View } from 'react-navi';
import { makeStyles } from '@material-ui/core';
import { Styles } from 'jss';
import routes from './routes';

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

  return (
    <Router routes={routes}>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </Router>
  );
};

export default App;
