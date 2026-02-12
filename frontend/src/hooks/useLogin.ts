import { useMutation } from '@tanstack/react-query';
import { login } from '@/service/auth.service';
import { useAuth } from '@/store/stores';

export function useLogin() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { accessToken, user } = data.data;

      setAuth(user, accessToken);
    },
  });
}
