import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';

export function useLogin() {
  const setAuthToken = useAuthStore((s) => s.setAuthToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuthToken(data.token);
    },
  });
}
