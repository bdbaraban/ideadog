import React from 'react';
import { lazy, mount, NaviRequest, redirect, route } from 'navi';
import { getIdeas, getTags, Idea, Tag, UserAuth } from '../api';
import { Navbar, NewIdeaFab } from '../components';
import { HomeLayout } from '../grids';
import { LazyImport, RoutePromise, Title } from './';

const titles: Title = {
  home: 'IdeaDog - Home',
  bright: 'IdeaDog - Bright'
};

const splitTags = (query: string | undefined): string[] => {
  if (query === undefined) {
    return [];
  }
  return query
    .split(',')
    .map(
      (tag: string): string => `${tag.charAt(0).toUpperCase()}${tag.slice(1)}`
    );
};

export default mount({
  '/': redirect('/home'),
  '/:sort': route(
    async (
      request: NaviRequest<object>,
      context: { user: UserAuth }
    ): Promise<RoutePromise> => {
      const { sort, tags } = request.params;
      const ideas: Idea[] = await getIdeas({ sort, tags });

      const currentTags: string[] = splitTags(request.params.tags);
      const allTags: Tag[] = await getTags();

      return {
        title: titles[sort],
        view: (
          <div>
            <Navbar sort={sort} />
            <HomeLayout
              ideas={ideas}
              currentTags={currentTags}
              allTags={allTags}
              user={context.user}
            />
            <NewIdeaFab allTags={allTags} user={context.user} />
          </div>
        )
      };
    }
  ),
  '/idea': lazy((): LazyImport => import('./idea')),
  '/user': lazy((): LazyImport => import('./user'))
});
