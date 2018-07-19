import jwt, { SignOptions, VerifyErrors } from 'jsonwebtoken';
import { defaultConfig } from '../config';
import { JWTPayload } from '../models';

export interface JWTResolve<T> {
  isValid: boolean;
  value: null | T;
}

export const jwtValidateToken = <T = JWTPayload>(
  token: string,
): Promise<JWTResolve<T>> =>
  new Promise(resolve => {
    jwt.verify(token, defaultConfig.secret, (err: VerifyErrors, value: any) => {
      return resolve({
        isValid: Boolean(err) === false,
        value,
      });
    });
  });

export const jwtSignPayload = (
  payload: string | object,
  options?: SignOptions,
): string =>
  jwt.sign(payload, defaultConfig.secret, { expiresIn: '1 day', ...options });
