import mongoose, { Mongoose } from 'mongoose';
import { defaultConfig, getURI } from './config';
import { initUserModel } from './models/user';

let instance: undefined | Mongoose;

export const dbInitConnection = async (uri?: string) => {
  instance = await mongoose.connect(
    uri || getURI(defaultConfig.db),
    { useNewUrlParser: true },
  );

  return instance;
};

export const getDbInstance = async () => {
  if (instance) {
    return instance;
  }

  instance = await mongoose.connect(
    getURI(defaultConfig.db),
    { useNewUrlParser: true },
  );

  initUserModel(instance.connection);

  return instance;
};
