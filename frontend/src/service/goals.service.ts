import type { PaginatedResponse } from '@/types/pagination.types';
import type { GoalPaginationParams } from '@/types/goals.types';
import type { Goal } from '@/types/goals.types';
import api from '@/config/axio';
import type { ApiResponse } from '@/types/api.types';

export const goalService = {
  // Get all goals for the current user with pagination and filter
  getUserGoals: async (params?: GoalPaginationParams): Promise<PaginatedResponse<Goal>> => {
    const { data } = await api.get<PaginatedResponse<Goal>>('/goals', {
      params,
    });
    return data;
  },

  // Get a specific goal by ID
  getGoalById: async (id: string): Promise<Goal> => {
    const { data } = await api.get<ApiResponse<Goal>>(`/goals/${id}`);
    return data.data;
  },

  // Create a new goal
  createGoal: async (
    goal: Omit<Goal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
  ): Promise<Goal> => {
    const { data } = await api.post<ApiResponse<Goal>>('/goals', goal);
    return data.data;
  },

  // Update an existing goal
  updateGoal: async (id: string, goal: Partial<Goal>): Promise<Goal> => {
    const { data } = await api.patch<ApiResponse<Goal>>(`/goals/${id}`, goal);
    return data.data;
  },

  // Delete a goal
  deleteGoal: async (id: string): Promise<void> => {
    await api.delete(`/goals/${id}`);
  },
};
