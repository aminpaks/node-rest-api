import { Router } from 'express';
import BodyParser from 'body-parser';
import { UserModel, UserRequestBody } from '../models/user';

export const userRoute = Router();

userRoute.use(BodyParser.urlencoded({ extended: true }));
userRoute.use(BodyParser.json());

userRoute.post('/', async (req, res) => {
  const body = req.body as UserRequestBody;
  const { name, email, password } = body;

  try {
    const user = await UserModel.create({
      name,
      email,
      password
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      result: false,
      error
    });
  }
});

userRoute.get('/', async (req, res) => {
  const query = UserModel.find({});

  try {
    const users = await query.exec();
    res.status(200).json({
      result: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      error
    });
  }
});

userRoute.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const result = await UserModel.findById(userId).exec();

  res.status(200).send(result);
});
