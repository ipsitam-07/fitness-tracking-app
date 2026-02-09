import type { PaginationParams } from '@/types/workout.types';

// Query keys
export const queryKeys = {
  dashboardStats: ['dashboard-stats'] as const,
  weeklyTrends: (weeks: number) => ['weekly-trends', weeks] as const,
  workoutStats: (params?: { startDate?: string; endDate?: string }) =>
    ['workout-stats', params] as const,
  workouts: (params?: PaginationParams) => ['workouts', params] as const,
  workout: (id: string) => ['workout', id] as const,
  goals: (params?: PaginationParams & { status?: string }) => ['goals', params] as const,
  goal: (id: string) => ['goal', id] as const,
  goalProgress: (id: string) => ['goal-progress', id] as const,
};
