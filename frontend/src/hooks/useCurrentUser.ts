import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/service/users.service';
import { useAuthStore } from '@/store/auth.store';

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: isAuthenticated,
    staleTime: 0,
  });
}
