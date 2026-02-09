import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/service/stats.service';

import { queryKeys } from '@/utils/queryKeys';

//Show dashboard stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: statsService.getDashboardStats,
    staleTime: 1000 * 60 * 5,
  });
};

//Show weekly trends
export const useWeeklyTrends = (weeks: number = 4) => {
  return useQuery({
    queryKey: queryKeys.weeklyTrends(weeks),
    queryFn: () => statsService.getWeeklyTrends(weeks),
    staleTime: 1000 * 60 * 5,
  });
};

//show workout stats
export const useWorkoutStats = (params?: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: queryKeys.workoutStats(params),
    queryFn: () => statsService.getWorkoutStats(params),
    staleTime: 1000 * 60 * 5,
  });
};
