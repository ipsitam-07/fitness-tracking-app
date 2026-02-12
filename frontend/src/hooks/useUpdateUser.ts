import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '@/service/users.service';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}
