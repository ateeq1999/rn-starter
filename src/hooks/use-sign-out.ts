import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

import { authApi } from '~/api/auth.api';
import { useAuthStore } from '~/store/auth.store';

export function useSignOut() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.signOut().catch(() => undefined),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      router.replace('/(auth)/sign-in');
    },
  });
}
