import React from 'react';
import { NextPage, NextPageContext } from 'next';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { SEO } from 'components/common';
import ApplicationBar from 'components/ApplicationBar';
import IdeasFeed from 'components/IdeasFeed';
import NewIdeaDialog from 'components/NewIdeaDialog';

import { useIdeasState } from 'hooks';
import { AppStore } from 'store';
import { fetchIdea } from 'store/ideas';
import { fetchTags } from 'store/tags';

// Idea page root styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

/**
 * Single idea page
 */
const IdeaPage: NextPage<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select idea from Redux store
  const idea = useIdeasState().all[0];

  return (
    <>
      <SEO
        title={`An idea from @${idea.owner.username}`}
        description={`${idea.owner.username} on IdeaDog: "${idea.text}"`}
        url={`/idea/${idea.key}`}
      />
      <div className={classes.root}>
        <header>
          <ApplicationBar search={false} filters={false} />
        </header>
        <main>
          <IdeasFeed />
          <NewIdeaDialog />
        </main>
      </div>
    </>
  );
};

interface IdeaPageContext extends NextPageContext {
  store: AppStore;
  query: NextPageContext['query'] & {
    key: string;
  };
}

IdeaPage.getInitialProps = async ({
  query,
  store
}: IdeaPageContext): Promise<{}> => {
  // Fetch requested idea
  await store.dispatch(fetchIdea(query.key));

  // Fetch tags
  await store.dispatch(fetchTags());

  return {};
};

export default IdeaPage;
