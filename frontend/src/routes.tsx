import React from 'react';
import { mount, redirect, route, NaviRequest } from 'navi';
import useIdeas, { Idea } from './api/useIdeas';
import useTags from './api/useTags';
import Navbar from './components/Navbar';
import GridLayout from './grids/GridLayout';

const titles: { [key: string]: string } = {
  all: 'IdeaDog - All',
  bright: 'IdeaDog - Bright'
};

const routes = mount({
  '/': redirect('/ideas/all'),
  /* eslint-disable */
  '/ideas/:filter': route(async (req: NaviRequest<object>) => {
    const filter: string = req.params.filter;
    const currentTags: string[] = req.params.tags !== undefined ?
      req.params.tags.split(',').map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)) :
      [];
    const ideas: Idea[] = useIdeas({filter, currentTags});
    const allTags: string[] = useTags();

    return {
      title: titles[filter],
      view: (
        <div>
          <Navbar filter={filter} />
          <GridLayout ideas={ideas} currentTags={currentTags} allTags={allTags} />
        </div>
      )
    };
  })
  /* eslint-enable */
});

export default routes;
