import { User } from '.';

export default class UserAuth {
  public currentUser: User | null;
  public constructor() {
    if (window.localStorage.getItem('auth')) {
      this.currentUser = JSON.parse(window.localStorage['auth']);
    } else {
      this.currentUser = null;
    }
  }

  private setCookie(): void {
    window.localStorage.setItem('auth', JSON.stringify(this.currentUser));
  }

  public async login(
    email: string | null,
    username: string | null
  ): Promise<void> {
    /* Login with email or username on back-end */

    this.currentUser = {
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

  public logout(): void {
    this.currentUser = null;
    window.localStorage.clear();
  }

  public register(email: string, username: string): void {
    /* Register user with email, username on back-end */

    this.currentUser = {
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

  public getCurrentUser = (): User | null => this.currentUser;
}
