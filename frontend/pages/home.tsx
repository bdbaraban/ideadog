import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { SEO } from 'components/common';
import ApplicationBar from 'components/ApplicationBar';
import IdeasFeed from 'components/IdeasFeed';
import NewIdeaDialog from 'components/NewIdeaDialog';

import { AppStore } from 'store';
import { fetchIdeas } from 'store/ideas';
import { fetchTags } from 'store/tags';

// Home page root styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

// Home page props
interface HomePageProps {
  error?: string; // Authorization error message
}

/**
 * Main home page
 */
const HomePage: NextPage<HomePageProps> = ({ error }: HomePageProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  useEffect((): void => {
    if (error) {
      alert(`Login Error: ${error}`);
    }
  }, [error]);

  return (
    <>
      <SEO
        title="Home"
        description="Home page of IdeaDog, a social media web application for sharing and discovering awesome, probably dog-related ideas."
        url="/home"
      />
      <div className={classes.root}>
        <header>
          <ApplicationBar />
        </header>
        <main>
          <IdeasFeed />
          <NewIdeaDialog />
        </main>
      </div>
    </>
  );
};

HomePage.getInitialProps = async ({
  query,
  store
}: NextPageContext & {
  store: AppStore;
}): Promise<HomePageProps> => {
  // Fetch ideas
  await store.dispatch(fetchIdeas());

  // Fetch tags
  await store.dispatch(fetchTags());

  return { error: query.error as string };
};

export default HomePage;
