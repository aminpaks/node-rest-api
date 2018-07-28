import mongoose, { Model, Connection, Document } from 'mongoose';
import { isDebugging } from '../../utils/debugging';

export interface IPermission {
  method: string;
  controller: string;
  params: Array<string>;
  description: string;
}
export interface IPermissionDoc extends Document, IPermission {}

export type IPermissionModel = Model<IPermissionDoc>;

const toJSON: mongoose.DocumentToObjectOptions = {
  transform: (_doc: any, { _id, ...rest }: any) => {
    return { permissionId: String(_id), ...rest };
  },
  versionKey: isDebugging(),
};

export const PermissionSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      index: true,
      required: true,
    },
    controller: {
      type: String,
      index: true,
      required: true,
    },
    params: {
      type: [String],
      index: true,
      required: true,
    },
    description: String,
  },
  {
    toJSON,
    collection: 'Permission',
    validateBeforeSave: true,
  },
);

// Turns email & username to be index
PermissionSchema.index(
  {
    method: 1,
    controller: 1,
    params: 1,
  },
  { index: true },
);

// export class PermissionClass {
//   findByEmail(email: string) {
//     return (this as any).findOne({ email }).exec();
//   }
//   isPasswordValid(password: string) {
//     const user = (this as any) as IUser;
//     return bcrypt.compareSync(password, user.password);
//   }
// }
// PermissionSchema.loadClass(PermissionClass);

let permissionModel: IPermissionModel;
export const initPermissionModel = async (connection: Connection) => {
  permissionModel = connection.model<IPermissionDoc>(
    'Permission',
    PermissionSchema,
  );

  return permissionModel;
};

export const getPermissionModel = () => permissionModel;
