import {
  createWorkout,
  findWorkoutsByUserId,
  findWorkoutbyWorkoutID,
} from '../repositories/workout.repository';
import { ICreateWorkoutDTO } from '../dtos/workout.dto';
import { AppError } from '../utils/error';

//Create workout for authenticated user
export async function createUserWorkoutService(userId: string, payload: ICreateWorkoutDTO) {
  if (!payload.type || payload.durationMinutes <= 0) {
    throw new AppError('Invalid workout data', 400);
  }

  return createWorkout({ ...payload, userId });
}

//Get all workouts of the authenticatd user
export async function getUserWorkoutsService(userId: string) {
  if (!userId) {
    throw new AppError('User not found', 404);
  }
  return findWorkoutsByUserId(userId);
}

//Get workout of authenticated user by workout id

export async function getWorkoutbyWorkoutIDService(workoutId: string, userId: string) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!workoutId) {
    throw new AppError('Invalid ID', 400);
  }

  const workout = await findWorkoutbyWorkoutID(workoutId);

  return workout;
}
