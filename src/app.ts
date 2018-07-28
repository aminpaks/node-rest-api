import express from 'express';
import { dbInitConnection, initAllModels } from './db';
import { startServer } from './server';
import { userRoute, authRoute } from './controllers';
import { corsMiddleware, jwtMiddleware } from './middlewares';

const app = express();

startServer(app)
  .then(async () => {
    const dbInstance = await dbInitConnection();
    await initAllModels(dbInstance.connection);

    app
      .use(corsMiddleware)
      .use(jwtMiddleware)
      .use('/auth', authRoute)
      .use('/users', userRoute);
  })
  .catch(err => {
    console.log('Server cannot start.', err);
    process.exit(1);
  });
