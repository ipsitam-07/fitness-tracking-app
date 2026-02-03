import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import { createUserWorkoutService } from '../services/workout.service';
import { ICreateWorkoutDTO } from '../dtos/workout.dto';

export const createWorkout = async (req: IAuthRequest, res: Response) => {
  const workout = await createUserWorkoutService(req.user!.id, req.body as ICreateWorkoutDTO);

  res.status(201).json({
    success: true,
    data: workout,
  });
};
