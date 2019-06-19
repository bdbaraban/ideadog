import { User } from '../types';
import ApproveAPI from 'approveapi';
/* eslint-disable @typescript-eslint/camelcase */

// ApproveAPI client
const client = ApproveAPI.createClient('sk_test_32dqMrJgaNdm5DpOJm5bHE');

/**
 * ApproveAPI prompt response type
 */
interface PromptResponse {
  id: string;
  sent_at: number;
  is_expired: boolean;
  request: {
    user: string;
    body: string;
    approve_text: string;
    reject_text: string;
    expires_in: number;
    metadata: {
      location: string;
      timestamp: string;
    };
  };
  answer: null | {
    result: boolean;
    time: number;
    metadata: {
      ip_address: string;
      browser: string;
      operating_system: string;
    };
  };
}

/**
 * Manages a user
 */
export default class UserSession {
  // The current logged in user
  public current: User | null;

  // Bearer token for logged in user
  public bearer: string;

  // Authorization token generated on back-end
  private token: string;

  // ApproveAPI prompt ID
  private promptId: string;

  public constructor() {
    this.current = null;
    this.bearer = '';
    this.token = '';
    this.promptId = '';
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

  // Send ApproveAPI prompt
  public async prompt(email: string): Promise<number> {
    const params = {
      user: email,
      body: 'Log in to IdeaDog?',
      approve_text: 'Authorize',
      reject_text: 'Reject',
      expires_in: 600,
      long_poll: true
    };

    const response: PromptResponse = await client.createPrompt(params);

    if (response.answer) {
      if (response.answer.result) {
        // Accepted
        this.promptId = response.id;
        return 200;
      } else {
        // Rejected
        return 307;
      }
    } else {
      // Timed out
      return 400;
    }
  }

  // Set bearer token for logged-in account
  public async setBearer(): Promise<number> {
    const response = await fetch('http://localhost:5000/api/validate_login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: this.token,
        prompt_id: this.promptId
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      this.bearer = data._key;
      window.localStorage.setItem('auth', this.bearer);
    }

    return response.status;
  }

  // Logout a user
  public logout(): void {
    this.current = null;
    window.localStorage.clear();
  }
}
