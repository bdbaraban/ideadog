import React, { ReactElement, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ApplicationBar, IdeasFeed, NewIdeaDialog } from 'components';
import { AppStore } from 'store';
import { fetchIdeas } from 'store/ideas/actions';
import { fetchTags } from 'store/tags/actions';

// Home page root styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

// Home page props
interface HomeProps {
  error?: string; // Authorization error message
}

/**
 * Main home page
 */
const Home: NextPage<HomeProps> = ({ error }: HomeProps): ReactElement => {
  const classes = useStyles();

  useEffect((): void => {
    if (error) {
      alert(`Login Error: ${error}`);
    }
  }, [error]);

  return (
    <div className={classes.root}>
      <header>
        <ApplicationBar />
      </header>
      <main>
        <IdeasFeed />
        <NewIdeaDialog />
      </main>
    </div>
  );
};

Home.getInitialProps = async ({
  query,
  store
}: NextPageContext & {
  store: AppStore;
}): Promise<HomeProps> => {
  // Fetch ideas
  await store.dispatch(fetchIdeas());

  // Fetch tags
  await store.dispatch(fetchTags());

  return { error: query.error as string };
};

export default Home;
