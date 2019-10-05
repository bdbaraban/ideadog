import React, { FC } from 'react';

import Divider from '@material-ui/core/Divider';

import {
  ApplicationBarCard,
  CustomCardHeader,
  UserStatistics
} from 'components/common';
import UserActions from './UserActions';

import { useUserState } from 'hooks';
import { formatShortDate } from 'utils';

/**
 * Wraps user card component displayed in ApplicationBar
 */
const ApplicationBarUserCardContainer: FC<{}> = () => {
  // Select logged in user
  const user = useUserState();

  return (
    <ApplicationBarCard>
      <CustomCardHeader
        username={user.profile.username}
        userKey={user.profile.key}
        subheaderColor="white"
        subheader={`Member since ${formatShortDate(
          new Date(user.profile.created_at)
        )}`}
      />

      <Divider />

      <UserStatistics
        ideas={Object.keys(user.profile.ideas).length}
        upvotes={user.profile.upvotes}
        favorite={user.profile.favorite || 'N/A'}
      />

      <Divider />

      <UserActions userKey={user.profile.key} />
    </ApplicationBarCard>
  );
};

export default ApplicationBarUserCardContainer;
