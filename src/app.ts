import express from 'express';
import { dbInitConnection } from './db';
import { startServer } from './server';
import { userRoute, authRoute } from './controllers';
import { authMiddleware, corsMiddleware } from './middlewares';

const app = express();

startServer(app)
  .then(async () => {
    await dbInitConnection();

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
    console.log('Server cannot start.', err);
    process.exit(1);
  });
