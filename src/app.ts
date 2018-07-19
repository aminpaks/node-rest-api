import '@babel/polyfill';
import express from 'express';
import { getDbInstance } from './db';
import { startServer } from './server';
import { userRoute, authMiddleware, authRoute } from './controllers';

const app = express();

startServer(app)
  .then(async () => {
    await getDbInstance();

    app.use(
      authMiddleware([
        {
          url: '/auth',
        },
        {
          url: '/users',
          methods: ['post'],
        },
      ]),
    );
    app.use('/auth', authRoute);
    app.use('/users', userRoute);
  })
  .catch(err => {
    console.log('Server could NOT start', err);
    process.exit(1);
  });
