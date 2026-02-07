import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '@/api/users.api';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}
