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
  const userId = req.user!.id;

  const { page, limit, search, type, startDate, endDate } = req.query;

  const result = await getUserWorkoutsService({
    userId,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search: search as string,
    type: type as string,
    startDate: startDate as string,
    endDate: endDate as string,
  });

  res.status(200).json({
    success: true,
    data: result.workouts,
    pagination: result.pagination,
  });
};

//Controller for fetching workout by an id
export const getWorkoutbyID = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;
  const workoutId = req.params.id as string;

  const workout = await getWorkoutbyWorkoutIDService(workoutId, userId);

  res.status(200).json({
    success: true,
    data: workout,
  });
};

//Controller for updating a workout
export const updateWorkoutbyID = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;
  const workoutId = req.params.id as string;
  const payload = req.body;

  const updatedWorkout = await updateWorkoutbyIDService(workoutId, userId, payload);

  res.status(200).json({
    success: true,
    data: updatedWorkout,
  });
};

//Controller for deleting a workout
export const deleteWorkoutbyiD = async (req: IAuthRequest, res: Response) => {
  const userId = req.user!.id;
  const workoutId = req.params.id as string;
  await deleteWorkoutbyIDService(workoutId, userId);

  res.status(204).send();
};
