import { Router } from 'express';
import { getUserModel, UserRequestPayload } from '../models/user';
import {
  handleError,
  handleValidationError,
  BaseError,
  BaseErrorResponseModel,
} from '../utils';

export const userRoute = Router();

const badRequestPayload: BaseErrorResponseModel & Partial<BaseError> = {
  status: 404,
  message: 'The request cannot be understood',
};

userRoute.options('/', (_req, res) => {
  res
    .set({
      Allow: 'OPTIONS, GET, POST',
    })
    .send()
    .end();
});

userRoute.post('/', async (req, res) => {
  const body = req.body as UserRequestPayload;
  const { firstName, lastName, email, password } = body;

  try {
    const user = await getUserModel().create({
      firstName,
      lastName,
      email,
      password,
    });
    return res.json(user);
  } catch (error) {
    switch (error.name) {
      case 'ValidationError':
        return handleValidationError(res, error, {
          causedBy: __filename,
          details: 'User model validation failure',
        });
      default:
        return handleError(res, badRequestPayload, error);
    }
  }
});

userRoute.get('/', async (req, res) => {
  const query = getUserModel().find({});

  try {
    const users = await query.exec();

    return res.json(users);
  } catch (error) {
    return handleError(res, badRequestPayload, error);
  }
});

userRoute.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await getUserModel()
      .findById(userId)
      .exec();

    return res.send(result);
  } catch (error) {
    return handleError(res, badRequestPayload, error);
  }
});
