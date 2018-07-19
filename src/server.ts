import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import { defaultConfig } from './config';

const defaultPort = 8091;

export const startServer = async (app: express.Express, port = defaultPort) => {
  app.listen(port, () => {
    console.log(`Server started and listening on port ${port}`);
  });
  app
    .use(
      helmet({
        noCache: true,
        referrerPolicy: true,
        hidePoweredBy: true,
      }),
    )
    .use(
      session({
        secret: defaultConfig.secret,
        resave: true,
        saveUninitialized: false,
      }),
    )
    .on('error', err => {
      console.log('Express server error:', err);
      process.exit(1);
    });
};
