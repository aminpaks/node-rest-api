import { RequestHandler } from 'express';
import { handleError } from '../utils/error-handler';
import {
  getBearerToken,
  isRequestAllowedBy,
  BypassRequestRule,
} from '../utils';
import { jwtValidateToken } from '../utils/jwt';

export interface IAuthMiddleware {
  (bypassRules: BypassRequestRule[]): RequestHandler;
}

export const authMiddleware: IAuthMiddleware = rules => async (
  req,
  res,
  next,
) => {
  if (isRequestAllowedBy(req, rules)) {
    return next();
  }
  // check header or url parameters or post parameters for token
  const token = getBearerToken(req.headers.authorization);

  // token exists
  if (token) {
    // verifies secret and checks exp
    const jwtResolve = await jwtValidateToken(token);
    if (jwtResolve.isValid) {
      // store user info in the request
      (req as any).decoded = jwtResolve.value;
      return next();
    }
  }

  return handleError(
    {
      by: 'Authentication middleware',
      reason: 'Invalid token',
    },
    res,
    {
      status: 403,
      message: 'Access denied',
    },
  );
};