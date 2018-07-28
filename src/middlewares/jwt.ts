import { RequestHandler } from 'express';
import { getBearerToken } from '../utils';
import { jwtValidateToken } from '../utils/jwt';

export const jwtMiddleware: RequestHandler = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = getBearerToken(req.headers.authorization);
  debugger;
  // token exists
  if (token) {
    // verifies secret and checks exp
    const jwtResolve = await jwtValidateToken(token);
    if (jwtResolve.isValid) {
      // store user info in the request
      (req as any).jwtPayload = jwtResolve.value;
    }
  }

  // continue to next handler
  return next();
};
