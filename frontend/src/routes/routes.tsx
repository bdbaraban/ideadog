import React from 'react';
import { lazy, mount, NaviRequest, redirect, route } from 'navi';
import { getIdeas, getTags, Idea, Tag } from '../api';
import { Navbar, NewIdeaFab } from '../components';
import { HomeLayout } from '../grids';
import { LazyImport, NotFoundPage, RoutePromise, Title } from './';

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
    async (req: NaviRequest<object>): Promise<RoutePromise> => {
      const sort: string = req.params.sort;
      if (sort !== 'home' && sort !== 'all' && sort !== 'bright') {
        return {
          title: 'IdeaDog - Not Found',
          view: <NotFoundPage />
        };
      }

      const currentTags: string[] = splitTags(req.params.tags);
      const allTags: Tag[] = await getTags();
      const ideas: Idea[] = await getIdeas({ sort, currentTags });

      return {
        title: titles[sort],
        view: (
          <div>
            <Navbar sort={sort === 'home' ? 'all' : sort} />
            <HomeLayout
              ideas={ideas}
              currentTags={currentTags}
              allTags={allTags}
            />
            <NewIdeaFab allTags={allTags} />
          </div>
        )
      };
    }
  ),
  '/idea': lazy((): LazyImport => import('./idea'))
});
