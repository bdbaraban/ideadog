import next from 'next';

// Configure Next application
const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import uid from 'uid-safe';
import morganBody from 'morgan-body';
import authRoutes from './authRoutes';

// Configure request handler
const handle = app.getRequestHandler();

app
  .prepare()
  .then((): void => {
    const server = express();
    server.use(bodyParser.json());
    morganBody(server);

    // Add session management
    const sess = {
      secret: uid.sync(18),
      cookie: {
        secure: false,
        maxAge: 86400 * 1000 // 24 hours in milliseconds
      },
      resave: false,
      saveUninitialized: true
    };

    if (process.env.NODE_ENV === 'production') {
      server.set('trust proxy', 1); // trust first proxy
      sess.cookie.secure = true; // serve secure cookies
    }

    server.use(session(sess));

    // Add authentication routes
    server.use(authRoutes);

    // Redirect root to home page
    server.get('/', (_, res): void => res.redirect('/home'));

    // Let Next handle all other requests
    server.get('*', (req, res): Promise<void> => handle(req, res));

    // Start server
    createServer(server).listen(process.env.PORT, (): void =>
      console.log(
        `*** Server serving on http://localhost:${process.env.PORT} ***`
      )
    );
  })
  .catch((ex): void => {
    console.error(ex.stack);
    process.exit(1);
  });
