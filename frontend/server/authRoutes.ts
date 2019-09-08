import express from 'express';
import { login, startLogin, startSignup } from './authFunctions';

const authRoutes = express.Router();

// Initiate Auth0 passwordless login
authRoutes.post('/startLogin', (req, res): void => {
  // Parse email from body
  const { email } = req.body;

  startLogin(email, (success, challengeToken, message): void => {
    if (!success) {
      res.send({ success: false, message });
    } else {
      // Store email and challenge token
      req.session!.challenge = {
        email,
        token: challengeToken
      };

      res.send({ success: true });
    }
  });
});

// Initiate Auth0 passwordless signup
authRoutes.post('/startSignup', (req, res): void => {
  const { email, username } = req.body;

  startSignup(email, username, (success, challengeToken, message): void => {
    if (!success) {
      res.send({ success: false, message });
    } else {
      // Store email and challenge token
      req.session!.challenge = {
        email,
        token: challengeToken
      };

      res.send({ success: true });
    }
  });
});

// Store bearer token for verified user
authRoutes.get('/login', (req, res): void => {
  const jwtToken = req.query.token;
  const challenge = req.session!.challenge;

  if (!jwtToken || !challenge || !challenge.email || !challenge.token) {
    res.redirect(
      `/home?error=${encodeURIComponent('Invalid login credentials.')}`
    );
  }

  login(
    challenge.email,
    challenge.token,
    jwtToken,
    (success, bearer, message): void => {
      // Delete challenge data on session
      delete req.session!.challenge;

      if (!success) {
        res.redirect(`/home?error=${encodeURIComponent(message as string)}`);
      }

      // Store bearer token on session
      req.session!.bearer = bearer;

      // Redirect back home
      res.redirect('/home');
    }
  );
});

// Delete bearer token for logged in user and redirect
authRoutes.get('/logout', (req, res): void => {
  req.session!.destroy((): void => {
    res.redirect(`${process.env.IDEADOG_DOMAIN as string}/home`);
  });
});

export default authRoutes;
