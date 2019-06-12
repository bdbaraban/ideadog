import { User } from '../types';

/**
 * Manages a user
 */
export default class UserSession {
  // The current logged in user
  public current: User | null;

  // Attempt to initialize the user using a cookie
  public constructor() {
    if (window.localStorage.getItem('auth')) {
      this.current = JSON.parse(window.localStorage['auth']);
    } else {
      this.current = null;
    }
  }

  // Set a cookie for the current user
  private setCookie(): void {
    window.localStorage.setItem('auth', JSON.stringify(this.current));
  }

  // Login a user
  public async login(
    email: string | null,
    username: string | null
  ): Promise<void> {
    /* Login with email or username on back-end */

    this.current = {
      id: '/users/7',
      key: '7',
      username: 'bdov_',
      email: 'b@b.com',
      ideas: ['1', '2', '3'],
      favorite: 'Dogs',
      upvotes: 9299,
      downvotes: 1000,
      active: true,
      /* eslint-disable */
      created_at: Date.now()
      /* eslint-enable */
    };

    this.setCookie();
  }

  // Logout a user
  public logout(): void {
    this.current = null;
    window.localStorage.clear();
  }

  // Register a user
  public register(email: string, username: string): void {
    /* Register user with email, username on back-end */

    this.current = {
      id: '1',
      key: '1',
      email,
      username,
      ideas: ['4', '5', '6'],
      favorite: 'Programming',
      upvotes: 199,
      downvotes: 1000,
      active: true,
      /* eslint-disable */
      created_at: Date.now()
      /* eslint-enable */
    };

    this.setCookie();
  }
}
