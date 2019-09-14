import React, { ReactElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ApplicationBar, NewIdeaDialog, UserIdeasFeed } from 'components';
import { AppStore } from 'store';
import { fetchUserIdeas } from 'store/ideas/actions';
import { fetchTags } from 'store/tags/actions';
import { User } from 'types';
import fetch from 'isomorphic-unfetch';

// Idea page root styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex'
    }
  })
);

// User page component prop types
interface UserPageProps {
  user: User;
}

/**
 * User page
 */
const UserPage: NextPage<UserPageProps> = ({
  user
}: UserPageProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        <ApplicationBar search={false} filters={false} />
      </header>
      <main>
        <UserIdeasFeed user={user} />
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

UserPage.getInitialProps = async ({
  query,
  store
}: UserPageContext): Promise<UserPageProps> => {
  // Fetch requested idea
  await store.dispatch(fetchUserIdeas(query.key));

  // Fetch viewing user
  const response = await fetch(`${process.env.IDEADOG_API}/user/${query.key}`);
  const data = await response.json();

  // Fetch tags asynchronously
  store.dispatch(fetchTags());

  return { user: data };
};

export default UserPage;
