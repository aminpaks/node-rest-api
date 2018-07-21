import { getEnvVar } from './env';

export const isProduction = () =>
  getEnvVar<string>('NODE_ENV', 'development') === 'production';

export const isDebugging = () => getEnvVar<boolean>('DEBUG', false) === true;
