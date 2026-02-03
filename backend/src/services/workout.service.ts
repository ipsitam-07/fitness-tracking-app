import { createWorkout } from '../repositories/workout.repository';
import { CreateWorkoutDTO } from '../dtos/workout.dto';
import { AppError } from '../utils/error';

export async function createUserWorkoutService(userId: string, payload: CreateWorkoutDTO) {
  if (!payload.type || payload.durationMinutes <= 0) {
    throw new AppError('Invalid workout data', 400);
  }

  return createWorkout({ ...payload, userId });
}
