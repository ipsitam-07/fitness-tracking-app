import { getCurrentUserService } from '../services/user.service';
import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { AppError } from '../utils/error';

export const getCurrentUser = async (req: IAuthRequest, res: Response) => {
  const user = req.user?.id;

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await getCurrentUserService(user);

  res.status(200).json({
    success: true,
    data: user,
  });
};
