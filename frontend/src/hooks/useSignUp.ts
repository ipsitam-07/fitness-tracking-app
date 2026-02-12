import { useMutation } from '@tanstack/react-query';
import { signup } from '@/service/auth.service';
import { useAuth } from '@/store/stores';

export function useSignup() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      const { accessToken, user } = data.data;

      setAuth(user, accessToken);
    },
  });
}
