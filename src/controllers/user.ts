import { Router } from 'express';
import { getUserModel, UserRequestPayload } from '../models/user';
import { handleError } from '../utils/error-handler';

export const userRoute = Router();

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
    handleError(error, res);
  }
});

userRoute.get('/', async (req, res) => {
  const query = getUserModel().find({});

  try {
    const users = await query.exec();
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
});

userRoute.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const result = await getUserModel()
    .findById(userId)
    .exec();

  res.status(200).send(result);
});
