import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import { isProduction, getEnvVar } from './utils';

const serverPort = getEnvVar<number>('SERVER_PORT', 5000);
const sessionSecret = getEnvVar<string>(
  'SESSION_SECRET',
  'set-a-default-value-here',
);

export const startServer = async (app: express.Express, port = serverPort) => {
  app.listen(port, () => {
    console.log(`Server started and listening on port ${port}`);
  });
  app
    .set('trust proxy', 1) // trust first proxy
    .use(
      helmet({
        noCache: true,
        referrerPolicy: true,
        hidePoweredBy: true,
      }),
    )
    .use(
      session({
        resave: true,
        secret: sessionSecret,
        saveUninitialized: false,
      }),
    )
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan(isProduction() ? 'common' : 'dev'))
    .on('error', err => {
      console.log('Uncaught server error.', err);
    });
};
