import { useMutation } from '@tanstack/react-query';
import { createGoal } from '../api/goals.api';

export function useCreateGoal() {
  return useMutation({
    mutationFn: createGoal,
  });
}
