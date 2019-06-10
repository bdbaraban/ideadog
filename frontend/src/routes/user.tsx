import React from 'react';
import { mount, NaviRequest, route } from 'navi';
import { Idea, getIdeas, UserAuth } from '../api';
import { Navbar } from '../components';
import { UserLayout } from '../grids';
import { RoutePromise } from './';

export default mount({
  '/:key': route(
    async (
      req: NaviRequest<object>,
      context: { user: UserAuth }
    ): Promise<RoutePromise> => {
      const key: string = req.params.key;
      const sort = 'home';
      const tags = 'programming';
      const ideas: Idea[] = await getIdeas({ sort, tags });

      return {
        title: 'IdeaDog - User',
        view: (
          <div>
            <Navbar sort={'home'} />
            <UserLayout ideas={ideas} user={context.user} />
          </div>
        )
      };
    }
  )
});
