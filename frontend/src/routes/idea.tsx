import React from 'react';
import { mount, NaviRequest, route } from 'navi';
import { getIdea, getTags, getUser } from '../api';
import { Navbar } from '../components';
import { IdeaLayout } from '../grids';
import { CheckboxTag, Idea } from '../types';
import { RouteContext, RoutePromise, setCheckboxTags } from '.';

/**
 * Individual idea page
 */
export default mount({
  '/:key': route(
    async (
      request: NaviRequest<object>,
      context: RouteContext
    ): Promise<RoutePromise> => {
      // Idea key
      const { key } = request.params;

      // Get idea with key `key`
      const idea: Idea = await getIdea({ key });

      // Get all available tags
      const allTags = await getTags();

      // Set checkbox tags based on allTags and query tags
      const checkboxTags: CheckboxTag[] = setCheckboxTags(undefined, allTags);

      // Fetch user, if bearer token cookie exists
      if (window.localStorage.getItem('auth')) {
        context.user.bearer = window.localStorage['auth'];
        context.user.current = await getUser('', context.user.bearer);
      }

      return {
        title: 'IdeaDog - Idea',
        view: (
          <div>
            <Navbar
              sort={'home'}
              user={context.user}
              checkboxTags={checkboxTags}
            />
            <IdeaLayout idea={idea} />
          </div>
        )
      };
    }
  )
});
