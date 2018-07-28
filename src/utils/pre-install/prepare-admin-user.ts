import { Connection } from 'mongoose';
import { initUserModel, getUserModel, IUser } from '../../models';

export const prepareAdminUser = async (connection: Connection) => {
  await initUserModel(connection);
  const adminUser = await getUserModel()
    .findOne({ email: 'admin@localhost' })
    .exec();

  if (!adminUser) {
    const adminUser = await getUserModel().create({} as IUser);
    console.log(adminUser);
  }

  debugger;
};
