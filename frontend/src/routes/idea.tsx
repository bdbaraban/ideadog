import React, { Suspense } from 'react';
import { mount, NaviRequest, route } from 'navi';
import { Idea, getIdea } from '../api';
import { Navbar } from '../components';
import { IdeaLayout } from '../grids';
import { NotFoundPage, RoutePromise } from './';

export default mount({
  '/:key': route(
    async (req: NaviRequest<object>): Promise<RoutePromise> => {
      const key: string = req.params.key;
      const ideas: Idea[] = await getIdea({ key });

      if (ideas[0] === undefined) {
        return {
          title: 'IdeaDog - Not Found',
          view: <NotFoundPage />
        };
      }

      return {
        title: 'IdeaDog - Idea',
        view: (
          <Suspense fallback={null}>
            <Navbar sort={'all'} />
            <IdeaLayout idea={ideas[0]} />
          </Suspense>
        )
      };
    }
  )
});
