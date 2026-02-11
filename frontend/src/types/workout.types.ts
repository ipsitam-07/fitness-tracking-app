import type { PaginationParams } from './pagination.types';
import * as z from 'zod';
import { workoutFormSchema } from '@/schemas/workout-form';

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
export interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (workout: Workout) => void;
}

export type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

export interface WorkoutFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: WorkoutFormValues) => void;
  workout?: Workout | null;
  isLoading?: boolean;
}
