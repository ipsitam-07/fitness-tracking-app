import { ExerciseType } from '../database/models/Workout';

export interface IWorkoutStatsDTO {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  averageDuration: number;
  averageCalories: number;
  workoutsByType: Record<ExerciseType, number>;
}
