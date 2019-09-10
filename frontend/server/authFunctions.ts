import fetch from 'isomorphic-unfetch';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
// @ts-ignore
import sendgridTransport from 'nodemailer-sendgrid-transport';
import emailTemplate from './emailTemplate';

// Configure nodemailer
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user: process.env.SENDGRID_USERNAME as string,
      api_key: process.env.SENDGRID_PASSWORD as string
    }
  })
);

// Generates a JWT for a given email.
const generate = (email: string): string => {
  return jwt.sign(
    {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 15 // 15 minutes
    },
    process.env.JWT_SECRET as string
  );
};

/**
 * Initiate log in for a given email.
 *   -> Assigns and returns a challenge token fetched from the IdeaDog API.
 *   -> Sends an magic link verification email.
 * @param email - Entered email.
 * @param done - Callback.
 */
export const startLogin = async (
  email: string,
  done: (
    success: boolean,
    challengeToken: string | null,
    message?: string
  ) => void
): Promise<void> => {
  // Retrieve challenge token from IdeaDog API
  const response = await fetch(`${process.env.IDEADOG_API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  // If bad response, failed to match email with an account
  if (response.status !== 200) {
    return done(false, null, 'Account with given email does not exist.');
  }

  // Else, parse challenge token
  const challenge = await response.json();

  // Generate JWT
  const jwtToken = generate(email);

  // Create magic link
  const link = `${process.env.IDEADOG_DOMAIN}/login?token=${jwtToken}`;

  if (process.env.NODE_ENV === 'development') {
    console.log('JWT:', jwtToken);
    return done(true, challenge.token);
  }

  const mailOptions = {
    to: email,
    from: 'IdeaDog <support@ideadog.site>',
    subject: 'Your IdeaDog Magic Link ✨🐕',
    html: emailTemplate(link)
  };

  // Send passwordless login verification email
  transporter.sendMail(mailOptions, (err: Error | null): void => {
    if (err) {
      return done(
        false,
        null,
        'Could not send magic link - please try again later.'
      );
    }
    return done(true, challenge.token);
  });
};

/**
 * Initiate sign up for a new user with a given email and username.
 *   -> Assigns and returns a challenge token fetched from the IdeaDog API.
 *   -> Sends an magic link verification email.
 * @param email - Entered email.
 * @param username - Entered username.
 * @param done - Callback.
 */
export const startSignup = async (
  email: string,
  username: string,
  done: (
    success: boolean,
    challengeToken: string | null,
    message?: string
  ) => void
): Promise<void> => {
  // Retrieve randomly-generated challenge token from back-end
  const response = await fetch(`${process.env.IDEADOG_API}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, username })
  });

  // If bad response, account with email already exists
  if (response.status !== 200) {
    return done(false, null, 'Account with email already exists.');
  }

  // Else, parse challenge token
  const challenge = await response.json();

  // Generate JWT
  const jwtToken = generate(email);

  // Generate magic link
  const link = `${process.env.IDEADOG_DOMAIN}/login?token=${jwtToken}`;

  if (process.env.NODE_ENV === 'development') {
    console.log('JWT:', jwtToken);
    return done(true, challenge.token);
  }

  const mailOptions = {
    to: email,
    from: 'IdeaDog <support@ideadog.site>',
    subject: 'Your IdeaDog Magic Link ✨🐕',
    html: emailTemplate(link)
  };

  // Send passwordless login verification email
  transporter.sendMail(mailOptions, (err: Error | null): void => {
    if (err) {
      return done(
        false,
        null,
        'Could not send magic link - please try again later.'
      );
    }
    return done(true, challenge.token);
  });
};

/**
 * Fetch an IdeaDog API bearer token at a verified callback.
 * @param email - Email address to verify.
 * @param challengeToken - Challenge token associated with email.
 * @param jwt - JWT token to verify email with.
 * @param done - Callback.
 */
export const login = (
  email: string,
  challengeToken: string,
  jwtToken: string,
  done: (success: boolean, bearer: string | null, message?: string) => void
): void => {
  // Verify JWT
  jwt.verify(
    jwtToken,
    process.env.JWT_SECRET as string,
    async (err: VerifyErrors): Promise<void> => {
      if (err) {
        return done(false, null, 'Failed to verify JWT.');
      }

      // Use challenge token to fetch IdeaDog API bearer token
      const response = await fetch(
        `${process.env.IDEADOG_API}/validate_login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: challengeToken,
            email
          })
        }
      );

      // If bad response, challenge token validation failed
      if (response.status !== 200) {
        return done(false, null, 'Failed to validate challenge token.');
      }

      // Else, parse bearer token
      const bearer = await response.json();

      return done(true, bearer._key);
    }
  );
};
