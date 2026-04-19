import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userApi } from '~/api/user.api';
import type { UpdateProfileInput } from '~/lib/schemas';
import { useAuthStore } from '~/store/auth.store';

export function useUpdateProfile() {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => userApi.updateProfile(data),
    onSuccess: (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
    },
  });
}
