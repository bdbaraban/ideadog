import React, { FC } from 'react';

import TopBar from './TopBar';
import RightDrawer from './RightDrawer';

import { useUserState } from 'hooks';

// ApplicationBar component prop types
export interface ApplicationBarProps {
  search?: boolean; // Whether to display searchbar true/false
  filters?: boolean; // Whether to display sort and tag filters true/false
}

/**
 * Wraps app toolbar.
 *   -> On desktop: top bar and permanent right drawer
 *   -> On mobile: permanent right drawer only
 */
const ApplicationBarContainer: FC<ApplicationBarProps> = ({
  search = true,
  filters = true
}: ApplicationBarProps) => {
  // Select logged in user
  const { isAuthenticated } = useUserState();

  return (
    <>
      <TopBar />
      <RightDrawer
        search={search}
        filters={filters}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default ApplicationBarContainer;
