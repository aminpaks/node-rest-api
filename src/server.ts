import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import { defaultConfig } from './config';
import { isDebugging, isProduction } from './utils/debugging';

const defaultPort = 8091;

export const startServer = async (app: express.Express, port = defaultPort) => {
  app.listen(port, () => {
    console.log(`Server started and listening on port ${port}`);
  });
  app.set('trust proxy', 1); // trust first proxy
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
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan(isProduction() ? 'common' : 'dev'))
    .on('error', err => {
      console.log('Express server error:', err);
      process.exit(1);
    });
};
