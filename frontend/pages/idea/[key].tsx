import React, { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ApplicationBar, SingleIdeaFeed } from 'components';
import { AppStore } from 'store';
import { fetchIdea } from 'store/ideas/actions';
import { fetchTags } from 'store/tags/actions';

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
const Idea: NextPage<{}> = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        <ApplicationBar search={false} filters={false} />
      </header>
      <main>
        <SingleIdeaFeed />
      </main>
    </div>
  );
};

interface IdeaPageContext extends NextPageContext {
  store: AppStore;
  query: NextPageContext['query'] & {
    key: string;
  };
}

Idea.getInitialProps = async ({
  query,
  store
}: IdeaPageContext): Promise<{}> => {
  // Fetch requested idea
  await store.dispatch(fetchIdea(query.key));

  // Fetch tags asynchronously
  store.dispatch(fetchTags());

  return {};
};

export default Idea;
