import '@babel/polyfill';
import express from 'express';
import { connectToDB } from './db';
import { startServer } from './server';
import { userRoute } from './controllers/user';

const app = express();
app.use('/users', userRoute);

connectToDB()
  .then(() => startServer(app))
  .catch(err => {
    console.log('DB Connection', err);
    process.exit(1);
  });
