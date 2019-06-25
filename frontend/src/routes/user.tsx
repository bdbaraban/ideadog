import React from 'react';
import { mount, NaviRequest, route } from 'navi';
import { getTags, getUser, getUserIdeas } from '../api';
import { Navbar, NewIdeaFab } from '../components';
import { UserLayout } from '../grids';
import { CheckboxTag, Idea, Tag, User } from '../types';
import { RouteContext, RoutePromise, setCheckboxTags } from '.';

/**
 * Individual user page
 */
export default mount({
  '/:key': route(
    async (
      request: NaviRequest<object>,
      context: RouteContext
    ): Promise<RoutePromise> => {
      // User key
      let { key } = request.params;

      // Get ideas posted by user with key `key`
      const ideas: Idea[] = await getUserIdeas({ key });

      // Get all available tags
      const allTags: Tag[] = await getTags();

      // Set checkbox tags based on allTags and query tags
      const checkboxTags: CheckboxTag[] = setCheckboxTags(undefined, allTags);

      // Fetch user, if bearer token cookie exists
      if (context.user.profile) {
        context.user.current = await getUser();
      }

      // Boolean indicating if current page is for current user
      const self = context.user.current && key === context.user.current.key;

      let viewingUser: User | null = context.user.current;
      if (!self) {
        viewingUser = await getUser(key);
      }

      return {
        title: 'IdeaDog - User',
        view: (
          <div>
            <Navbar
              sort={'home'}
              user={context.user}
              checkboxTags={checkboxTags}
            />
            <UserLayout
              user={context.user}
              viewingUser={viewingUser}
              ideas={ideas}
              allTags={allTags}
            />
            <NewIdeaFab user={context.user} allTags={allTags} />
          </div>
        )
      };
    }
  )
});
