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

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface WorkoutPaginationParams extends PaginationParams {
  type?: string;
}

export interface GoalPaginationParams extends PaginationParams {
  status?: 'active' | 'completed' | 'abandoned';
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
