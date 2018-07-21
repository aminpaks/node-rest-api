import { Router } from 'express';
import { getUserModel, UserRequestPayload } from '../models/user';
import { handleError } from '../utils/error-handler';

export const userRoute = Router();

const badRequestPayload = {
  status: 400,
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
    res.json(user);
  } catch (error) {
    handleError(res, badRequestPayload, error);
  }
});

userRoute.get('/', async (req, res) => {
  const query = getUserModel().find({});

  try {
    const users = await query.exec();

    return res.status(200).json(users);
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

    return res.status(200).send(result);
  } catch (error) {
    return handleError(res, badRequestPayload, error);
  }
});
