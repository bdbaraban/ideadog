import { User } from '../types';
import ApproveAPI from 'approveapi';

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

  public constructor() {
    this.current = null;
    this.bearer = '';
  }

  // Set a cookie for the current user
  private setCookie(): void {
    window.localStorage.setItem('auth', this.bearer);
  }

  // Send ApproveAPI prompt
  public async prompt(email: string): Promise<number> {
    const params = {
      user: email,
      body: 'Log in to IdeaDog?',
      /* eslint-disable @typescript-eslint/camelcase */
      approve_text: 'Authorize',
      reject_text: 'Reject',
      expires_in: 600,
      long_poll: true
      /* eslint-enable @typescript-eslint/camelcase */
    };

    return await client
      .createPrompt(params)
      .then((response: PromptResponse): number => {
        if (response.answer) {
          if (response.answer.result) {
            return 200;
          } else {
            return 307;
          }
        } else {
          return 307;
        }
      });
  }

  // Logout a user
  public logout(): void {
    this.current = null;
    window.localStorage.clear();
  }
}
