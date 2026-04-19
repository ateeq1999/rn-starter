import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

import { authApi } from '~/api/auth.api';
import type { SignInInput } from '~/lib/schemas';
import { useAuthStore } from '~/store/auth.store';

export function useSignIn() {
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (data: SignInInput) => authApi.signIn(data),
    onSuccess: ({ token, user }) => {
      setToken(token);
      setUser(user);
      router.replace('/(app)');
    },
  });
}
