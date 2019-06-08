import { Matcher } from 'navi';

export interface Title {
  [key: string]: string;
}

export interface RoutePromise {
  title: string;
  view: React.ReactElement;
}

export type LazyImport =
  | Matcher<object, object>
  | PromiseLike<Matcher<object, object> | { default: Matcher<object, object> }>;
