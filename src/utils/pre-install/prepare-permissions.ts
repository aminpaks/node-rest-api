import { Connection } from 'mongoose';
import {
  getPermissionModel,
  initPermissionModel,
  IPermission,
} from '../../models';

export const preparePermissions = async (connection: Connection) => {
  await initPermissionModel(connection);
  await getPermissionModel().remove({});

  const addResult = await getPermissionModel().insertMany([
    {
      method: 'create',
      controller: 'user',
      params: [],
      description: 'Create user',
    } as IPermission,
    {
      method: 'retrieve',
      controller: 'user',
      params: ['list'],
      description: 'Retrieve users',
    } as IPermission,
    {
      method: 'retrieve',
      controller: 'user',
      params: ['by', 'userId'],
      description: 'Retrieve user',
    } as IPermission,
  ]);
};
