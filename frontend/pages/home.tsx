import React, { ReactElement, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { IdeaFeed, Layout } from 'components';
import { AppStore } from 'store';
import { fetchIdeas } from 'store/ideas/actions';
import { fetchTags } from 'store/tags/actions';

// Home page props
interface HomeProps {
  error?: string; // Authorization error message
}

/**
 * Main home page
 */
const Home: NextPage<HomeProps> = ({ error }: HomeProps): ReactElement => {
  useEffect((): void => {
    if (error) {
      alert(`Login Error: ${error}`);
    }
  }, [error]);

  return (
    <Layout>
      <IdeaFeed />
    </Layout>
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
