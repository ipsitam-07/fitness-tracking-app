import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { createUserWorkoutService, getUserWorkoutsService } from '../services/workout.service';
import { ICreateWorkoutDTO } from '../dtos/workout.dto';
import { AppError } from '../utils/error';

export const createWorkout = async (req: IAuthRequest, res: Response) => {
  const workout = await createUserWorkoutService(req.user!.id, req.body as ICreateWorkoutDTO);

  res.status(201).json({
    success: true,
    data: workout,
  });
};

export const getUserWorkout = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const workouts = await getUserWorkoutsService(userId);

  return res.status(200).json({
    success: true,
    data: workouts,
  });
};
