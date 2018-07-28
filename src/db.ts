import mongoose, { Mongoose } from 'mongoose';
import { initUserModel } from './models/user';
import { getEnvVar } from './utils';
import { initPermissionModel, initPermissionRelationModel } from './models';

let instance: undefined | Mongoose;
const dbURI = getEnvVar<string>('MONGODB_URI');

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
  initPermissionModel(instance.connection);
  initPermissionRelationModel(instance.connection);
  initUserModel(instance.connection);

  return instance;
};
