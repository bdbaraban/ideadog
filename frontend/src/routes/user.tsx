import React from 'react';
import { mount, NaviRequest, route } from 'navi';
import { getTags, getUserIdeas } from '../api';
import { Navbar, NewIdeaFab } from '../components';
import { UserLayout } from '../grids';
import { CheckboxTag, Idea, Tag } from '../types';
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
      const { key } = request.params;

      // Get ideas posted by user with key `key`
      const ideas: Idea[] = await getUserIdeas({ key });

      // Get all available tags
      const allTags: Tag[] = await getTags();

      // Set checkbox tags based on allTags and query tags
      const checkboxTags: CheckboxTag[] = setCheckboxTags(undefined, allTags);

      return {
        title: 'IdeaDog - User',
        view: (
          <div>
            <Navbar
              sort={'home'}
              user={context.user}
              checkboxTags={checkboxTags}
            />
            <UserLayout user={context.user} ideas={ideas} allTags={allTags} />
            <NewIdeaFab user={context.user} allTags={allTags} />
          </div>
        )
      };
    }
  )
});
