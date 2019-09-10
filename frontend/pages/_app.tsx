import React, { ReactElement } from 'react';
import App, { AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'theme';
import { DeepPartial, Store } from 'redux';
import { Provider } from 'react-redux';
import { AppState, AppStore, initializeStore } from 'store';
import { fetchUser } from 'store/user/actions';

/**
 * Fetch existing stored Redux state or initialize a new one.
 * @param initialState {AppState} - Redux state object.
 */
const getOrCreateStore = (initialState?: DeepPartial<AppState>): AppStore => {
  // Initialize new state if on server
  if (typeof window === 'undefined') {
    return initializeStore(initialState);
  }

  // Store Redux store on window if non-existant
  if (!(window as any)['__NEXT_REDUX_STORE__']) {
    (window as any)['__NEXT_REDUX_STORE__'] = initializeStore(initialState);
  }

  // Fetch Redux store from window
  return (window as any)['__NEXT_REDUX_STORE__'];
};

interface CustomAppProps {
  pageProps: {};
  initialState: AppState;
}

/**
 * Wrap Next application with Material-UI styles and Redux
 */
export default class CustomApp extends App {
  public static async getInitialProps({
    ctx,
    Component
  }: AppContext): Promise<CustomAppProps> {
    // Initialize store
    const store = getOrCreateStore();

    // Provide the store to getInitialProps of pages
    (ctx as any).store = store;

    if (process.env.NODE_ENV === 'production') {
      // Fetch user, if bearer token exists
      if (
        ctx.req &&
        (ctx.req as any).session &&
        (ctx.req as any).session.bearer
      ) {
        await store.dispatch(fetchUser((ctx.req as any).session.bearer));
      }
    } else {
      await store.dispatch(
        fetchUser('9WURFiA0hozMhQWEV614De8c25bNqUhMZZCJ8CaQ4hM=')
      );
    }

    // Fetch any NextPage props
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      initialState: store.getState()
    };
  }

  private store: Store<AppState>;

  public constructor(props: CustomAppProps & AppProps) {
    super(props);
    this.store = getOrCreateStore(props.initialState);
  }

  componentDidMount(): void {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render(): ReactElement {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>IdeaDog</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={this.store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}
