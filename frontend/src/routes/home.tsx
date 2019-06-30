import React from 'react';
import { lazy, mount, NaviRequest, redirect, route } from 'navi';
import { getIdeas, getTags, getUser } from '../api';
import { Navbar } from '../components';
import { HomeLayout } from '../grids';
import { CheckboxTag, Idea, Tag } from '../types';
import {
  LazyImport,
  RouteContext,
  RoutePromise,
  setCheckboxTags,
  Title
} from '.';

/**
 * Meta titles
 */
const titles: Title = {
  home: 'IdeaDog - Home',
  bright: 'IdeaDog - Bright'
};

/**
 * Primary home page
 */
export default mount({
  '/': redirect('/home'),
  '/:sort': route(
    async (
      request: NaviRequest<object>,
      context: RouteContext
    ): Promise<RoutePromise> => {
      // Pull out sort filter (hostname), checked tags (query param), and search string (query param)
      const { sort, tags, search } = request.params;

      // Get current ideas based on sort, tags, and search filters
      const ideas: Idea[] = await getIdeas(sort, tags, search);

      // Get all available tags
      const allTags: Tag[] = await getTags();

      // Set checkbox tags based on allTags and query tags
      const checkboxTags: CheckboxTag[] = setCheckboxTags(tags, allTags);

      // Fetch user, if bearer token is available
      if (context.user.bearer !== '') {
        context.user.current = await getUser(undefined, context.user.bearer);
      }

      return {
        title: titles[sort],
        view: (
          <div>
            <Navbar
              sort={sort}
              user={context.user}
              checkboxTags={checkboxTags}
            />
            <HomeLayout
              ideas={ideas}
              user={context.user}
              allTags={allTags}
              checkboxTags={checkboxTags}
            />
          </div>
        )
      };
    }
  ),
  // Lazy load /idea route
  '/idea': lazy((): LazyImport => import('./idea')),

  // Lazy load /user route
  '/user': lazy((): LazyImport => import('./user'))
});
