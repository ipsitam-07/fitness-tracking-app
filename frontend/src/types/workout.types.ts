import type { PaginationParams } from './pagination.types';
export interface Workout {
  id: string;
  userId?: string;
  exerciseType: string;
  exerciseName: string;
  duration: number;
  caloriesBurned: number;
  date: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  averageDuration: number;
  averageCalories: number;
  workoutsByType: {
    cardio: number;
    strength: number;
    flexibility: number;
    sports: number;
    other: number;
  };
}

export interface WorkoutPaginationParams extends PaginationParams {
  type?: string;
}

export interface RecentWorkoutsProps {
  workouts: Workout[];
  onLogWorkout?: () => void;
  onLoadMore?: () => void;
  onEdit?: (workout: Workout) => void;
  onDelete?: (workout: Workout) => void;
  hasMore?: boolean;
}
