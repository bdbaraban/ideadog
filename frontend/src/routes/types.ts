import { Matcher } from 'navi';
import { UserSession } from '../api';

/**
 * Meta title type
 */
export interface Title {
  // Page meta title
  [key: string]: string;
}

/**
 * Route return type
 */
export interface RoutePromise {
  // Page meta title
  title: string;

  // View component
  view: React.ReactElement;
}

/**
 * Route context type
 */
export interface RouteContext {
  // User Session
  user: UserSession;
}

/**
 * Lazy load route type
 */
export type LazyImport =
  | Matcher<object, object>
  | PromiseLike<Matcher<object, object> | { default: Matcher<object, object> }>;
