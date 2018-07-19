import mongoose from 'mongoose';

export interface UserRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;

  findByEmail(email: string): IUser;
}

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String
  },
  {
    _id: false
  }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);

export class User {
  static findByEmail(email: string) {
    return (this as any).findOne({ email });
  }
}

UserSchema.loadClass(User);
