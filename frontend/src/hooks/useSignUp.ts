import { useMutation } from '@tanstack/react-query';
import { signup } from '@/service/auth.service';
import { useAuth } from '@/store/stores';
import { setToken } from '@/utils/storage';

export function useSignup() {
  const { hydrate } = useAuth();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setToken(data.data.accessToken);
      hydrate();
    },
  });
}
