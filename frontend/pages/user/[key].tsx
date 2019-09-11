import React, { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ApplicationBar, IdeasFeed, NewIdeaDialog } from 'components';
import { AppStore } from 'store';
import { fetchUserIdeas } from 'store/ideas/actions';
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
 * User page
 */
const User: NextPage<{}> = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        <ApplicationBar search={false} filters={false} />
      </header>
      <main>
        <IdeasFeed />
        <NewIdeaDialog />
      </main>
    </div>
  );
};

interface UserPageContext extends NextPageContext {
  store: AppStore;
  query: NextPageContext['query'] & {
    key: string;
  };
}

User.getInitialProps = async ({
  query,
  store
}: UserPageContext): Promise<{}> => {
  // Fetch requested idea
  await store.dispatch(fetchUserIdeas(query.key));

  // Fetch tags asynchronously
  store.dispatch(fetchTags());

  return {};
};

export default User;
