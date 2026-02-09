import type { WorkoutPaginationParams, Workout } from '@/types/workout.types';
import type { PaginatedResponse } from '@/types/pagination.types';
import type { ApiResponse } from '@/types/api.types';
import api from '@/api/axio';

export const workoutService = {
  // Get all workouts for the current user with pagination and filtering
  getUserWorkouts: async (
    params?: WorkoutPaginationParams,
  ): Promise<PaginatedResponse<Workout>> => {
    const { data } = await api.get<PaginatedResponse<Workout>>('/workouts', {
      params,
    });
    return data;
  },

  // Get a specific workout by ID
  getWorkoutById: async (id: string): Promise<Workout> => {
    const { data } = await api.get<ApiResponse<Workout>>(`/workouts/${id}`);
    return data.data;
  },

  // Create a new workout
  createWorkout: async (
    workout: Omit<Workout, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
  ): Promise<Workout> => {
    const { data } = await api.post<ApiResponse<Workout>>('/workouts', workout);
    return data.data;
  },

  // Update an existing workout
  updateWorkout: async (id: string, workout: Partial<Workout>): Promise<Workout> => {
    const { data } = await api.patch<ApiResponse<Workout>>(`/workouts/${id}`, workout);
    return data.data;
  },

  // Delete a workout
  deleteWorkout: async (id: string): Promise<void> => {
    await api.delete(`/workouts/${id}`);
  },
};
