import { User } from '../types';

/**
 * Manages a user
 */
export default class UserSession {
  // The current logged in user
  public current: User | null;

  // Bearer token for logged in user
  public bearer: string;

  // Attempt to initialize the user using a cookie
  public constructor() {
    this.current = null;
    this.bearer = '';
  }

  // Set a cookie for the current user
  private setCookie(): void {
    window.localStorage.setItem('auth', this.bearer);
  }

  // Login a user
  public async login(email: string): Promise<number> {
    const response = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      this.bearer = data._key;
      this.setCookie();
    }
    return response.status;
  }

  // Logout a user
  public logout(): void {
    this.current = null;
    window.localStorage.clear();
  }

  // Register a user
  public async signup(email: string, username: string): Promise<number> {
    const response = await fetch('/api/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username
      })
    });
    if (response.status === 200) {
      const data = await response.json();
      this.bearer = data._key;
      this.setCookie();
    }
    return response.status;
  }
}
