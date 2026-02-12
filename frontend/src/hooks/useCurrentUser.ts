import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/service/users.service';
import { useAuth } from '@/store/stores';

export function useCurrentUser() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 0,
  });
}
