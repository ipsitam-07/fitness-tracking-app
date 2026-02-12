import { useMutation } from '@tanstack/react-query';
import { login } from '@/service/auth.service';
import { useAuth } from '@/store/stores';
import { setToken } from '@/utils/storage';

export function useLogin() {
  const { hydrate } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.data.accessToken);
      hydrate();
    },
  });
}
