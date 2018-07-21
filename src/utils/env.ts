import { isString } from 'lodash';

export type EnvVariableType = string | boolean | number;

export const getEnvVar = <T extends EnvVariableType>(
  key: string,
  defaultValue?: T,
): T => {
  const value = process.env[key];

  if (isString(value)) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return value as T;
    }
  }
  return defaultValue as T;
};
