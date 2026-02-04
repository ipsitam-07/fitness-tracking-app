import { IWorkoutStatsDTO } from '../dtos/stats.dto';
import { AppError } from '../utils/error';
import { getWorkoutStats } from '../repositories/stats.repository';
import { ExerciseType } from '../database/models/Workout';

//Get workout statictics for an user
export async function getWorkoutStatsService(userId: string, startDate?: Date, endDate?: Date) {
  if (!userId) {
    throw new AppError('User ID is required', 400);
  }

  const workouts = await getWorkoutStats(userId, startDate, endDate);

  const stats: IWorkoutStatsDTO = {
    totalWorkouts: workouts.length,
    totalDuration: workouts.reduce((sum, w) => sum + w.duration, 0),
    totalCalories: workouts.reduce((sum, w) => sum + w.caloriesBurned, 0),
    averageDuration: 0,
    averageCalories: 0,
    workoutsByType: {} as Record<ExerciseType, number>,
  };

  //avg calculation to get avg workout duration and calories burned
  if (workouts.length > 0) {
    stats.averageDuration = Math.round(stats.totalDuration / workouts.length);
    stats.averageCalories = Math.round(stats.totalCalories / workouts.length);
  }

  Object.values(ExerciseType).forEach((type) => {
    stats.workoutsByType[type] = 0;
  });

  workouts.forEach((workout) => {
    stats.workoutsByType[workout.exerciseType]++;
  });

  return stats;
}
