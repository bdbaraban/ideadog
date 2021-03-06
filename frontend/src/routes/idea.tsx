import React from 'react';
import { mount, NaviRequest, route } from 'navi';
import { getCurrentUser, getIdea, getTags } from '../api';
import { Navbar } from '../components';
import { IdeaLayout } from '../layouts';
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
      // Pull out idea key (hostname)
      const { key } = request.params;

      // Get idea with key `key`
      const idea: Idea = await getIdea(key);

      // Get all available tags
      const allTags = await getTags();

      // Set checkbox tags based on allTags and query tags
      const checkboxTags: CheckboxTag[] = setCheckboxTags(undefined, allTags);

      // Fetch user, if bearer token is available
      await context.user.getBearer();
      if (context.user.bearer !== '') {
        context.user.current = await getCurrentUser(context.user.bearer);
      } 

      return {
        title: `IdeaDog - Idea ${key}`,
        view: (
          <div>
            <Navbar
              sort={'home'}
              user={context.user}
              checkboxTags={checkboxTags}
            />
            <IdeaLayout user={context.user} idea={idea} />
          </div>
        )
      };
    }
  )
});
