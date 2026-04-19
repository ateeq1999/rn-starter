import { useQuery } from '@tanstack/react-query';

import { authApi } from '~/api/auth.api';
import { useAuthStore } from '~/store/auth.store';

export function useSession() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ['auth', 'session'],
    queryFn: authApi.getSession,
    enabled: !!token,
  });
}
