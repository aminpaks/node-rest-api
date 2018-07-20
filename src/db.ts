import mongoose, { Mongoose } from 'mongoose';
import { initUserModel } from './models/user';
import { getEnvVar } from './utils';

let instance: undefined | Mongoose;
const dbURI = getEnvVar<undefined | string>('MONGODB_URI');

export const dbInitConnection = async (uri = dbURI) => {
  if (!uri) {
    throw new Error(
      'MongoDB URI cannot be found! Did you forgot to setup your env variables?',
    );
  }
  instance = await mongoose.connect(
    uri,
    { useNewUrlParser: true },
  );
  console.log('MongoDB connection established.', uri);
  initUserModel(instance.connection);

  return instance;
};
