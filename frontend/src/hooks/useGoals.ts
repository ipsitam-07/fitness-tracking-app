import type { GoalPaginationParams } from '@/types/goals.types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queryKeys';
import { goalService } from '@/service/goals.service';
import { statsService } from '@/service/stats.service';

//Fetch all goals of an user
export const useGoals = (params?: GoalPaginationParams) => {
  return useQuery({
    queryKey: queryKeys.goals(params),
    queryFn: () => goalService.getUserGoals(params),
    staleTime: 1000 * 60 * 2,
  });
};

//Fetch a specific goal of an user by its id
export const useGoal = (id: string) => {
  return useQuery({
    queryKey: queryKeys.goal(id),
    queryFn: () => goalService.getGoalById(id),
    enabled: !!id,
  });
};

//Fetch progress of a specifc goal
export const useGoalProgress = (id: string) => {
  return useQuery({
    queryKey: queryKeys.goalProgress(id),
    queryFn: () => statsService.getGoalProgress(id),
    enabled: !!id,
  });
};

//Create a goal for an user
export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: goalService.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};

//Update an existing for an user
export const useUpdateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => goalService.updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};

//Delete an existing goal for an user
export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: goalService.deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });
};
