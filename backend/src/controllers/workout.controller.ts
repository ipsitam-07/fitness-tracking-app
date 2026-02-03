import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { createUserWorkoutService } from '../services/workout.service';
import { AppError } from '../utils/error';
import { CreateWorkoutDTO } from '../dtos/workout.dto';

export const createWorkout = async (req: IAuthRequest, res: Response) => {
  const workout = await createUserWorkoutService(req.user!.id, req.body as CreateWorkoutDTO);

  res.status(201).json({
    success: true,
    data: workout,
  });
};
