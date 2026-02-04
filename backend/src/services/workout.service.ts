import {
  createWorkout,
  findWorkoutsByUserId,
  findWorkoutbyWorkoutID,
  deleteWorkoutbyID,
} from '../repositories/workout.repository';
import { ICreateWorkoutDTO, IUpdateWorkoutDTO } from '../dtos/workout.dto';
import { AppError } from '../utils/error';

//Create workout for authenticated user
export async function createUserWorkoutService(userId: string, payload: ICreateWorkoutDTO) {
  // Validation
  if (!payload.exerciseType || !payload.exerciseName) {
    throw new AppError('Exercise type and name are required', 400);
  }
  if (payload.duration <= 0) {
    throw new AppError('Duration must be greater than 0', 400);
  }
  if (payload.caloriesBurned < 0) {
    throw new AppError('Calories burned cannot be negative', 400);
  }
  return createWorkout({ ...payload, userId });
}

//Get all workouts of the authenticatd user
export async function getUserWorkoutsService(userId: string) {
  if (!userId) {
    throw new AppError('User ID is required', 400);
  }
  return findWorkoutsByUserId(userId);
}
//Get workout of authenticated user by workout id

export async function getWorkoutbyWorkoutIDService(workoutId: string, userId: string) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!workoutId) {
    throw new AppError('Workout ID is required', 400);
  }

  const workout = await findWorkoutbyWorkoutID(workoutId);

  if (!workout) {
    throw new AppError('Workout not found', 404);
  }

  if (workout.userId !== userId) {
    throw new AppError('Forbidden: You do not have access to this workout', 403);
  }
  return workout;
}

//Update the workout of an authenticated user by workout id

export async function updateWorkoutbyIDService(
  workoutId: string,
  userId: string,
  payload: IUpdateWorkoutDTO,
) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  if (!workoutId) {
    throw new AppError('Workout ID is required', 400);
  }

  if (Object.keys(payload).length === 0) {
    throw new AppError('No fields provided to update', 400);
  }

  if (payload.duration !== undefined && payload.duration <= 0) {
    throw new AppError('Duration must be greater than 0', 400);
  }
  if (payload.caloriesBurned !== undefined && payload.caloriesBurned < 0) {
    throw new AppError('Calories burned cannot be negative', 400);
  }

  const workout = await findWorkoutbyWorkoutID(workoutId);

  if (!workout) {
    throw new AppError('Workout not found', 404);
  }

  if (workout.userId !== userId) {
    throw new AppError('Forbidden: You do not have access to this workout', 403);
  }

  await workout.update(payload);
  return workout;
}

//Delete workout of an user using id
export async function deleteWorkoutbyIDService(workoutId: string, userId: string) {
  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }
  if (!workoutId) {
    throw new AppError('Workout ID is required', 400);
  }

  const workout = await findWorkoutbyWorkoutID(workoutId);

  if (!workout) {
    throw new AppError('Workout not found', 404);
  }

  if (workout.userId !== userId) {
    throw new AppError('Forbidden: You do not have access to this workout', 403);
  }

  await deleteWorkoutbyID(workoutId);

  return true;
}
