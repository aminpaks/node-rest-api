import bcrypt from 'bcrypt';
import mongoose, { Model, Mongoose, Connection, Document } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import { isDebugging } from '../utils/debugging';
import { getSaltSync } from './salt';

export interface UserRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  findByEmail(email: string): IUser;
}

const toJSON: mongoose.DocumentToObjectOptions = {
  transform: (_doc: any, { _id, password, ...rest }: any) => {
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
      trim: true,
    },
    // username: {
    //   type: String,
    //   unique: true,
    //   required: true,
    //   trim: true,
    // },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
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

UserSchema.pre<IUser>('save', function(next) {
  const user = this;
  try {
    if (user.isNew) {
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      next();
    }
  } catch (err) {
    next(err);
  }
});

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
