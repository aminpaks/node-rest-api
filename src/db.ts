import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import { defaultCredential, getURI } from './config';

export const connectToDB = () =>
  mongoose.connect(
    getURI(defaultCredential),
    { useNewUrlParser: true }
  );
