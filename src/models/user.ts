import bcrypt from 'bcrypt';
import mongoose, { Model, Connection, Document } from 'mongoose';
import { isDebugging } from '../utils/debugging';

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

  findByEmail(email: string): Promise<IUser>;
  isPasswordValid(password: string): Promise<boolean>;
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
    if (this.isModified('password') || user.isNew) {
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      return next();
    }
  } catch (err) {
    return next(err);
  }
});

export class User {
  findByEmail(email: string) {
    return (this as any).findOne({ email }).exec();
  }
  isPasswordValid(password: string) {
    const user = (this as any) as IUser;
    return bcrypt.compareSync(password, user.password);
  }
}
UserSchema.loadClass(User);

let userModel: Model<IUser>;
export const initUserModel = (connection: Connection) => {
  userModel = connection.model<IUser>('user', UserSchema);

  return userModel;
};
export const getUserModel = () => userModel;
