import React, { FC } from 'react';

import Divider from '@material-ui/core/Divider';

import { CustomCardHeader, GridCard, UserStatistics } from 'components/common';

import { User } from 'types';
import { formatShortDate } from 'utils';

// UserGridCard component prop types
interface UserGridCardProps {
  viewingUser: User; // Current viewing user
}

/**
 * User card component displayed for UserIdeasGrid
 */
const UserGridCard: FC<UserGridCardProps> = ({
  viewingUser
}: UserGridCardProps) => {
  return (
    <GridCard>
      <CustomCardHeader
        username={viewingUser.username}
        userKey={viewingUser.key}
        subheaderColor="blue"
        subheader={`Member since: ${formatShortDate(
          new Date(viewingUser.created_at)
        )}`}
      />

      <Divider />

      <UserStatistics
        ideas={Object.keys(viewingUser.ideas).length}
        upvotes={viewingUser.upvotes}
        favorite={viewingUser.favorite || 'N/A'}
      />

      <Divider />
    </GridCard>
  );
};

export default UserGridCard;
