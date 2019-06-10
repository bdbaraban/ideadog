import React from 'react';
import { mount, NaviRequest, route } from 'navi';
import { Idea, getIdea } from '../api';
import { Navbar } from '../components';
import { IdeaLayout } from '../grids';
import { RoutePromise } from './';

export default mount({
  '/:key': route(
    async (req: NaviRequest<object>): Promise<RoutePromise> => {
      const key: string = req.params.key;
      const ideas: Idea[] = await getIdea({ key });

      return {
        title: 'IdeaDog - Idea',
        view: (
          <div>
            <Navbar sort={'home'} />
            <IdeaLayout idea={ideas[0]} />
          </div>
        )
      };
    }
  )
});
