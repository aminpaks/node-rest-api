import express from 'express';
import { dbInitConnection, getDbInstance } from './db';
import { startServer } from './server';
import { userRoute, authRoute } from './controllers';
import { authMiddleware, corsMiddleware } from './middlewares';
import { getEnvVar } from './utils';

const app = express();
const serverPort = getEnvVar<number>('PORT');
const dbURI = getEnvVar<undefined | string>('MONGODB_URI');

startServer(app, serverPort)
  .then(async () => {
    await dbInitConnection(dbURI);

    app
      .use(corsMiddleware)
      .use(
        authMiddleware([
          {
            url: '*',
            methods: ['options'],
          },
          {
            url: '/auth',
          },
          {
            url: '/users',
            methods: ['post'],
          },
        ]),
      )
      .use('/auth', authRoute)
      .use('/users', userRoute);
  })
  .catch(err => {
    console.log('Server could NOT start', err);
    process.exit(1);
  });
