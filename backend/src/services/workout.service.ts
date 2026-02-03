import { createWorkout, findWorkoutsByUserId } from '../repositories/workout.repository';
import { ICreateWorkoutDTO } from '../dtos/workout.dto';
import { AppError } from '../utils/error';

export async function createUserWorkoutService(userId: string, payload: ICreateWorkoutDTO) {
  if (!payload.type || payload.durationMinutes <= 0) {
    throw new AppError('Invalid workout data', 400);
  }

  return createWorkout({ ...payload, userId });
}

export async function getUserWorkoutsService(userId: string) {
  if (!userId) {
    throw new AppError('User not found', 404);
  }
  return findWorkoutsByUserId(userId);
}
