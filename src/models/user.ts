import mongoose, { Model, Mongoose, Connection, Document } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import { isDebugging } from '../utils/debugging';

export interface UserRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUser extends Document {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  findByEmail(email: string): IUser;
}

const toJSON: mongoose.DocumentToObjectOptions = {
  transform: (doc: any, { _id, ...rest }: any) => {
    return { userId: String(_id), ...rest };
  },
  versionKey: isDebugging(),
};

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON,
    // strict: true,
    collection: 'User',
    validateBeforeSave: true,
  },
);

// export class User {
//   static findByEmail(email: string) {
//     return (this as any).findOne({ email });
//   }
// }
// UserSchema.loadClass(User);
// UserSchema.plugin(autoIncrement, { model: 'user' });

let userModel: Model<IUser>;
export const initUserModel = (connection: Connection) => {
  userModel = connection.model<IUser>('user', UserSchema);
  // userModel
  //   .remove({})
  //   .exec()
  //   .then(value => {
  //     console.log('all rows delete', value);
  //   });

  return userModel;
};
export const getUserModel = () => userModel;
