import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { registerUserService, loginUserService } from '../services/auth.service';
import { IRegisterInputDTO, ILoginInputDTO } from '../dtos/auth.dto';

export const registerUser = async (req: IAuthRequest, res: Response) => {
  const { email, name, password } = req.body as IRegisterInputDTO;

  const user = await registerUserService({ email, name, password });

  res.status(201).json({
    success: true,
    data: user,
  });
};

export const loginUser = async (req: IAuthRequest, res: Response) => {
  const { email, password } = req.body as ILoginInputDTO;

  const userData = await loginUserService({ email, password });
  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: userData,
  });
};
