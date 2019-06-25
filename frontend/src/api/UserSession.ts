import { User } from '../types';
import auth0, {
  Auth0DecodedHash,
  Auth0Error,
  Auth0ParseHashError,
  Auth0UserProfile
} from 'auth0-js';
/* eslint-disable @typescript-eslint/camelcase */

// Auth0 client
const webAuth = new auth0.WebAuth({
  clientID: 'hzBQJSgcjR2QYjOXtnLeBaFOD7wmR4V4',
  domain: 'dev-917aksrt.auth0.com',
  redirectUri: 'http://localhost:1234',
  responseType: 'token',
  scope: 'openid profile'
});

/**
 * Manages a user
 */
export default class UserSession {
  // Current logged in user
  public current: User | null;
  // Current user's Auth0 profile;
  public profile: Auth0UserProfile | null;
  // Bearer token for logged in user
  public bearer: string;
  // Authorization token generated on back-end
  private token: string;

  public constructor() {
    [this.current, this.profile] = [null, null];

    if (
      window.localStorage.getItem('accessToken') &&
      window.localStorage.getItem('expiresAt')
    ) {
      // If valid Auth0 access token exists, fetch profile
      const accessToken = window.localStorage['accessToken'];
      const expiresAt = parseInt(window.localStorage['expiresAt']);

      if (new Date().getTime() < expiresAt) {
        this.fetchUser(accessToken);
      }
    } else if (window.location.hash) {
      // If Auth0 user verification hash exists, fetch profile
      webAuth.parseHash(
        { hash: window.location.hash },
        (
          err: Auth0ParseHashError | null,
          authResult: Auth0DecodedHash | null
        ): void => {
          if (
            !err &&
            authResult &&
            authResult.accessToken &&
            authResult.expiresIn
          ) {
            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem(
              'expiresAt',
              (authResult.expiresIn * 1000 + new Date().getTime()).toString()
            );
            this.fetchUser(authResult.accessToken);
          }
        }
      );
    }

    this.bearer = '';
    this.token = '';
  }

  // Fetch Auth0 user profile
  private fetchUser(accessToken: string): void {
    webAuth.client.userInfo(
      accessToken,
      (err: Auth0Error | null, user: Auth0UserProfile): void => {
        if (!err) {
          this.profile = user;
        }
      }
    );
  }

  // Fetch login/signup token from back-end
  public async setToken(email: string, username: string = ''): Promise<number> {
    const route =
      username === ''
        ? 'http://localhost:5000/api/login'
        : 'http://localhost:5000/api/signup';

    const body = JSON.stringify(
      username === '' ? { email } : { email, username }
    );

    const response = await fetch(route, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });

    if (response.status === 200) {
      const data = await response.json();
      this.token = data.token;
    }
    return response.status;
  }

  // Send Auth0 verfication code email
  public send = (email: string): void => {
    webAuth.passwordlessStart(
      {
        connection: 'email',
        send: 'code',
        email
      },
      (err: Auth0Error | null): void => {
        if (err) {
          throw err;
        }
      }
    );
  };

  // Verify Auth0 passwordless login code
  public verify = (email: string, verificationCode: string): void => {
    webAuth.passwordlessVerify(
      {
        connection: 'email',
        email,
        verificationCode
      },
      (err: Auth0Error | null): void => {
        if (err) {
          throw err;
        }
      }
    );
  };

  // Set bearer token for logged-in account
  public async fetchCookie(): Promise<number> {
    if (!this.profile) {
      return 400;
    }

    const response = await fetch('http://localhost:5000/api/validate_login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: this.token,
        sub: this.profile.sub
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      this.bearer = data._key;
    }

    return response.status;
  }

  // Logout a user
  public logout(): void {
    this.current = null;
    this.profile = null;
    window.localStorage.clear();
  }
}
