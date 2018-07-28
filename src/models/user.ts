import bcrypt from 'bcrypt';
import mongoose, {
  Model,
  Connection,
  Document,
  DocumentToObjectOptions,
} from 'mongoose';
import { isDebugging } from '../utils/debugging';

export interface UserRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserDoc extends Document, IUser {
  findByEmail(email: string): Promise<IUserDoc>;
  isPasswordValid(password: string): Promise<boolean>;
}

export type IUserModel = Model<IUserDoc>;

const toJSON: DocumentToObjectOptions = {
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
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
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

// Turns email & username to be index
UserSchema.index(
  {
    email: 1,
    username: 1,
  },
  { index: true },
);

UserSchema.pre<IUserDoc>('save', function(next) {
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
    const user = (this as any) as IUserDoc;
    return bcrypt.compareSync(password, user.password);
  }
}
UserSchema.loadClass(User);

let userModel: Model<IUserDoc>;
export const initUserModel = (connection: Connection) => {
  userModel = connection.model<IUserDoc>('User', UserSchema);

  return userModel;
};
export const getUserModel = () => userModel;
