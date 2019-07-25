import { API, DOMAIN } from '../constants';
import { User } from '../types';
import auth0, {
  Auth0DecodedHash,
  Auth0Error,
  Auth0ParseHashError,
  Auth0UserProfile
} from 'auth0-js';

// Auth0 client
const webAuth = new auth0.WebAuth({
  clientID: 'hzBQJSgcjR2QYjOXtnLeBaFOD7wmR4V4',
  domain: 'dev-917aksrt.auth0.com',
  redirectUri: DOMAIN,
  responseType: 'token',
  scope: 'openid profile'
});

/**
 * Manages a user
 */
export default class UserSession {
  // Current logged in user
  public current: User | null;
  // API Bearer token for logged in user
  public bearer: string;

  public constructor() {
    this.current = null;
    this.bearer = '';
  }

  // Set API login/signup authorization token from back-end
  public async setChallengeToken(
    email: string,
    username: string = ''
  ): Promise<number> {
    const route = username === '' ? `${API}/login` : `${API}/signup`;

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
      window.localStorage.setItem('challengeToken', data.token);
    }
    return response.status;
  }

  // Get bearer token for logged-in accout
  public async getBearer(): Promise<void> {
    if (window.localStorage.getItem('bearer')) {
      this.bearer = window.localStorage['bearer'];
    } else if (window.location.hash) {
      await webAuth.parseHash(
        { hash: window.location.hash },
        (
          err: Auth0ParseHashError | null,
          authResult: Auth0DecodedHash | null
        ): void => {
          if (!err && authResult && authResult.accessToken) {
            webAuth.client.userInfo(
              authResult.accessToken,
              (err: Auth0Error | null, user: Auth0UserProfile): void => {
                if (!err) {
                  this.setBearer(user.name);
                }
              }
            );
          }
        }
      );
    }
  }

  // Set bearer token for logged-in account
  public async setBearer(email: string): Promise<void> {
    let challengeToken = '';
    if (window.localStorage.getItem('challengeToken')) {
      challengeToken = window.localStorage['challengeToken'];
      window.localStorage.removeItem('challengeToken');
    } else {
      return;
    }

    const response = await fetch(`${API}/validate_login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: challengeToken,
        email
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      this.bearer = data._key;
      window.localStorage.setItem('bearer', this.bearer);
    }
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

  // Logout a user
  public logout(): void {
    this.current = null;
    this.bearer = '';
    window.localStorage.clear();
  }
}
