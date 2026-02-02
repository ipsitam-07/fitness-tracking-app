import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { registerUserService } from '../services/auth.service';
import { AppError } from '../utils/error';

export const registerUser = async (req: IAuthRequest, res: Response) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  if (email === undefined) {
    console.log('Cannot read email');
  }

  if (!email || !name || !password) {
    throw new AppError('Name, email and password are required', 400);
  }

  const user = await registerUserService({ email, name, password });

  res.status(201).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
};
