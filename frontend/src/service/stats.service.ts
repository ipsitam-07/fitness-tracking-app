import type {
  DashboardStatsResponse,
  WeeklyTrend,
  DailyWorkoutData,
} from '@/types/dashboard.types';
import api from '@/config/axio';
import type { ApiResponse } from '@/types/api.types';
import type { WorkoutStats } from '@/types/workout.types';
import type { GoalProgress } from '@/types/goals.types';

export const statsService = {
  // Get dashboard summary stats
  getDashboardStats: async (): Promise<DashboardStatsResponse> => {
    const { data } = await api.get<ApiResponse<DashboardStatsResponse>>('/stats/dashboard');
    return data.data;
  },

  // Get weekly trends
  getWeeklyTrends: async (weeks: number = 4): Promise<WeeklyTrend[]> => {
    const { data } = await api.get<ApiResponse<WeeklyTrend[]>>('/stats/weekly-stats', {
      params: { weeks },
    });
    return data.data;
  },

  // Get daily workouts for current week
  getDailyWorkouts: async (): Promise<DailyWorkoutData> => {
    const { data } = await api.get<ApiResponse<DailyWorkoutData>>('/stats/daily-workouts');
    return data.data;
  },

  // Get workout stats
  getWorkoutStats: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<WorkoutStats> => {
    const { data } = await api.get<ApiResponse<WorkoutStats>>('/workouts/stats', {
      params,
    });
    return data.data;
  },

  // Get goal progress
  getGoalProgress: async (goalId: string): Promise<GoalProgress> => {
    const { data } = await api.get<ApiResponse<GoalProgress>>(`/goals/${goalId}/progress`);
    return data.data;
  },
};
