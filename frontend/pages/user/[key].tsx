import React from 'react';
import { NextPage, NextPageContext } from 'next';
import 'isomorphic-unfetch';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import { SEO } from 'components/common';
import ApplicationBar from 'components/ApplicationBar';
import IdeasFeed from 'components/IdeasFeed';
import NewIdeaDialog from 'components/NewIdeaDialog';
import { User } from 'types';

import { useUserState } from 'hooks';
import { AppStore } from 'store';
import { fetchUserIdeas } from 'store/ideas';
import { fetchTags } from 'store/tags';

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
  viewingUser: User;
}

/**
 * User page
 */
const UserPage: NextPage<UserPageProps> = ({ viewingUser }: UserPageProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select logged in user from Redux store
  const user = useUserState();

  return (
    <>
      <SEO
        title={`@${viewingUser.username}`}
        description={`Profile for user ${viewingUser.username} on IdeaDog, a social media web application for sharing and discovering awesome, probably dog-related ideas.`}
        url={`/user/${viewingUser.key}`}
      />
      <div className={classes.root}>
        <header>
          <ApplicationBar search={false} filters={false} />
        </header>
        <main>
          <IdeasFeed
            viewingUser={
              user.profile.key === viewingUser.key ? undefined : viewingUser
            }
          />
          <NewIdeaDialog />
        </main>
      </div>
    </>
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

  // Fetch tags
  await store.dispatch(fetchTags());

  // Fetch viewing user
  const response = await fetch(`${process.env.IDEADOG_API}/user/${query.key}`);
  const data = await response.json();

  return { viewingUser: data };
};

export default UserPage;
