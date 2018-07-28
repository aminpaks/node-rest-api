import { RequestHandler } from 'express';
import { getUserModel, JWTPayload } from '../../models';
import { handleError } from '../error-handlers';

export const grantPermission = (param: {
  action: string;
}): RequestHandler => async (req, res, next) => {
  debugger;
  const jwtPayload: JWTPayload = (req as any).jwtPayload;
  if (jwtPayload) {
    debugger;
    // return handleError(res, { status: 403 }, 'Invalid usage');
  }
  return next();
};
