import mongoose, {
  Connection,
  Document,
  DocumentToObjectOptions,
  Model,
  Schema,
} from 'mongoose';
import { isDebugging } from '../../utils/debugging';

export interface IPermissionRelation extends Document {
  _id: string;
}

export type IPermissionRelationModel = Model<IPermissionRelation>;

const toJSON: DocumentToObjectOptions = {
  transform: (_doc: any, { _id, _userId, _permissionId, ...rest }: any) => {
    return {
      permissionRelationId: String(_id),
      permissionId: String(_permissionId),
      userId: String(_userId),
      ...rest,
    };
  },
  versionKey: isDebugging(),
};

export const PermissionRelationSchema = new Schema(
  {
    _permissionId: {
      type: Schema.Types.ObjectId,
      ref: 'PermissionSchema',
      required: true,
    },
    _userId: {
      type: Schema.Types.ObjectId,
      ref: 'UserSchema',
      required: true,
    },
  },
  {
    toJSON,
    // strict: true,
    collection: 'PermissionRelation',
    validateBeforeSave: true,
  },
);

PermissionRelationSchema.index(
  {
    _permissionId: 1,
    _userId: 1,
  },
  { index: true },
);

let permissionRelationModel: IPermissionRelationModel;
export const initPermissionRelationModel = (connection: Connection) => {
  permissionRelationModel = connection.model<IPermissionRelation>(
    'PermissionRelation',
    PermissionRelationSchema,
  );

  return permissionRelationModel;
};

export const getPermissionRelationModel = () => permissionRelationModel;
