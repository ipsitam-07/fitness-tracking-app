import { getCurrentUserService, updateCurrentUserService } from '../services/user.service';
import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { AppError } from '../utils/error';
import { asyncHandler } from '../utils/asyncHandler';
export const getCurrentUser = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;

  const user = await getCurrentUserService(userId);

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      weight: user.weight,
      height: user.height,
      gender: user.gender,
      age: user.age,
    },
  });
};

export const updateCurrentUser = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;

  const { name, weight, height, gender, age } = req.body;

  const updatedUser = await updateCurrentUserService(userId, {
    name,
    weight,
    height,
    gender,
    age,
  });

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      weight: updatedUser.weight,
      height: updatedUser.height,
      gender: updatedUser.gender,
      age: updatedUser.age,
    },
  });
};
