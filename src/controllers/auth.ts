import { Router } from 'express';
import { AuthRequestPayload, getUserModel } from '../models';
import {
  getBearerToken,
  jwtValidateToken,
  handleError,
  jwtSignPayload,
} from '../utils';

export const authRoute = Router();

authRoute.post('/', async (req, res) => {
  const body = req.body as AuthRequestPayload;
  const { email, password: enteredPassword } = body;
  const standardAccessDenied = {
    status: 403,
    message: 'Invalid email or password',
  };

  try {
    try {
      const users = await getUserModel()
        .find({ email })
        .exec();

      const user = users[0];
      if (user) {
        const result = await user.isPasswordValid(enteredPassword);

        if (result) {
          const userJSON = user.toJSON();
          const { userId } = userJSON;
          const token = jwtSignPayload({ userId });
          return res.json({
            ...userJSON,
            token,
          });
        } else {
          throw new Error('Password does NOT match');
        }
      }
    } catch (err) {
      return handleError(err, res, standardAccessDenied);
    }
  } catch (error) {
    return handleError(error, res, standardAccessDenied);
  }

  return handleError(
    new Error('Could not finish authentication'),
    res,
    standardAccessDenied,
  );
});

authRoute.patch('/', async (req, res) => {
  const body = req.body as AuthRequestPayload;
  const { token = getBearerToken(req.headers.authorization) } = body;

  if (token) {
    const jwtResolve = await jwtValidateToken(token);
    if (jwtResolve.isValid) {
      const { exp, iat, ...payload } = jwtResolve.value!;
      return res.json({
        token: jwtSignPayload(payload),
      });
    }
  }
  return handleError(new Error(`Invalid token: ${token}`), res, {
    status: 403,
    message: 'Invalid token',
  });
});
