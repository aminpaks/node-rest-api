import { dbInitConnection } from './db';
import { preparePermissions } from './utils';

export const setup = async () => {
  const dbInstance = await dbInitConnection();

  await preparePermissions(dbInstance.connection);

  debugger;
};

setup()
  .then(() => {
    console.log(
      `
Setup successfully completed
  `.trim(),
    );
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
