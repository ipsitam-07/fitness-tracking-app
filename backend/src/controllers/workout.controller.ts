import { Response } from 'express';
import { IAuthRequest } from '../interfaces';
import {
  createUserWorkoutService,
  deleteWorkoutbyIDService,
  getUserWorkoutsService,
  getWorkoutbyWorkoutIDService,
  updateWorkoutbyIDService,
} from '../services/workout.service';
import { ICreateWorkoutDTO } from '../dtos/workout.dto';
import { AppError } from '../utils/error';

//Controller for workout creation
export const createWorkout = async (req: IAuthRequest, res: Response) => {
  const workout = await createUserWorkoutService(req.user!.id, req.body as ICreateWorkoutDTO);

  res.status(201).json({
    success: true,
    data: workout,
  });
};

//Controller for fetching all workouts of an user
export const getUserWorkout = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const workouts = await getUserWorkoutsService(userId);

  res.status(200).json({
    success: true,
    data: workouts,
  });
};

//Controller for fetching workout by an id
export const getWorkoutbyID = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const workoutId = req.params.id;

  if (!workoutId || typeof workoutId !== 'string') {
    throw new AppError('Invalid id', 400);
  }

  const workout = await getWorkoutbyWorkoutIDService(workoutId, userId);

  res.status(200).json({
    success: true,
    data: workout,
  });
};

//Controller for updating a workout
export const updateWorkoutbyID = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const workoutId = req.params.id;
  const payload = req.body;

  if (!userId || typeof userId !== 'string') {
    throw new AppError('Unauthorized', 401);
  }
  if (!workoutId || typeof workoutId !== 'string') {
    throw new AppError('Invalid ID', 400);
  }

  const updatedWorkout = await updateWorkoutbyIDService(workoutId, userId, payload);

  res.status(200).json({
    success: true,
    data: updatedWorkout,
  });
};

//Controller for deleting a workout
export const deleteWorkoutbyiD = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;
  const workoutId = req.params.id;

  if (!userId || typeof userId !== 'string') {
    throw new AppError('Unauthorized', 401);
  }
  if (!workoutId || typeof workoutId !== 'string') {
    throw new AppError('Invalid ID', 400);
  }

  await deleteWorkoutbyIDService(workoutId, userId);

  res.status(204).send();
};
