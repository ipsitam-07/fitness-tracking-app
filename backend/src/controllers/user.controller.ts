import { getCurrentUserService } from '../services/user.service';
import { Response } from 'express';
import { IAuthRequest } from '../interfaces';

export const getCurrentUser = async (req: IAuthRequest, res: Response) => {
  const user = await getCurrentUserService(req.user?.id!);

  res.status(200).json({
    success: true,
    data: user,
  });
};
