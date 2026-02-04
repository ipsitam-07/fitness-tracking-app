import { ExerciseType } from '../database/models/Workout';

export interface IWorkoutStatsDTO {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  averageDuration: number;
  averageCalories: number;
  workoutsByType: Record<ExerciseType, number>;
}

export interface IDashboardStatsDTO {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  activeGoals: number;
  completedGoals: number;
  currentStreak: number;
  longestStreak: number;
  thisWeek: {
    workouts: number;
    calories: number;
    duration: number;
  };
  thisMonth: {
    workouts: number;
    calories: number;
    duration: number;
  };
  favoriteExerciseType: ExerciseType | null;
  recentWorkouts: Array<{
    id: string;
    exerciseName: string;
    exerciseType: ExerciseType;
    duration: number;
    caloriesBurned: number;
    date: Date;
  }>;
}

export interface IWeeklyTrendDTO {
  week: string;
  startDate: string;
  endDate: string;
  workouts: number;
  duration: number;
  calories: number;
}
