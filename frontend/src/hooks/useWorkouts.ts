import type { WorkoutPaginationParams } from '@/types/workout.types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queryKeys';
import { workoutService } from '@/service/workout.service';

//Get all workouts of an user
export const useWorkouts = (params?: WorkoutPaginationParams) => {
  return useQuery({
    queryKey: queryKeys.workouts(params),
    queryFn: () => workoutService.getUserWorkouts(params),
    staleTime: 1000 * 60 * 2,
  });
};

//Get workout by workout id
export const useWorkout = (id: string) => {
  return useQuery({
    queryKey: queryKeys.workout(id),
    queryFn: () => workoutService.getWorkoutById(id),
    enabled: !!id,
  });
};

//Create workout for an user
export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workoutService.createWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      queryClient.invalidateQueries({ queryKey: ['weekly-trends'] });
    },
  });
};

//update a workout for an user
export const useUpdateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => workoutService.updateWorkout(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
};

//delete a workout for an user
export const useDeleteWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: workoutService.deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboardStats });
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
};
