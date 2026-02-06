import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/auth.api';
import { useAuthStore } from '../store/auth.store';

export function useSignup() {
  const setAuthToken = useAuthStore((s) => s.setAuthToken);

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setAuthToken(data.token);
    },
  });
}
