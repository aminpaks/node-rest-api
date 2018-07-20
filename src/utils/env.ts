export const getEnvVar = <T = any>(key: string, defaultValue?: T): T =>
  (process.env[key] || defaultValue) as T;
