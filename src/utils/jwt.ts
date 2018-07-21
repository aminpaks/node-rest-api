import jwt, { SignOptions, VerifyErrors } from 'jsonwebtoken';
import { JWTPayload } from '../models';
import { getEnvVar } from './env';

const jwtSecret = getEnvVar<string>(
  'JWT_SECRET',
  'default-secret-must-be-replaced',
);

export interface JWTResolve<T> {
  isValid: boolean;
  value: null | T;
}

export const jwtValidateToken = <T = JWTPayload>(
  token: string,
): Promise<JWTResolve<T>> =>
  new Promise(resolve => {
    jwt.verify(token, jwtSecret, (err: VerifyErrors, value: any) => {
      return resolve({
        isValid: Boolean(err) === false,
        value,
      });
    });
  });

export const jwtSignPayload = (
  payload: string | object,
  options?: SignOptions,
): string => jwt.sign(payload, jwtSecret, { expiresIn: '1 day', ...options });
