import React, { ReactElement } from 'react';
import { IdeaFeed, Layout } from 'components';

/**
 * Main home page
 */
const Home = (): ReactElement => {
  return (
    <Layout>
      <IdeaFeed />
    </Layout>
  );
};

export default Home;
