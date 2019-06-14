import React from 'react';
import { lazy, mount, NaviRequest, redirect, route } from 'navi';
import { getIdeas, getTags, getUser } from '../api';
import { Navbar, NewIdeaFab } from '../components';
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
      // Pull out `sort` filter (hostname) and checked tags (query params)
      const { sort, tags } = request.params;

      // Get current ideas based on sort and query tags
      const ideas: Idea[] = await getIdeas({ sort, tags });

      // Get all available tags
      const allTags: Tag[] = await getTags();

      // Set checkbox tags based on allTags and query tags
      const checkboxTags: CheckboxTag[] = setCheckboxTags(tags, allTags);

      // Fetch user, if bearer token cookie exists
      if (window.localStorage.getItem('auth')) {
        context.user.bearer = window.localStorage['auth'];
        context.user.current = await getUser(context.user.bearer);
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
            <NewIdeaFab user={context.user} allTags={allTags} />
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
