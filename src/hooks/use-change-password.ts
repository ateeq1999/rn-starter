import { useMutation } from '@tanstack/react-query';

import { authApi } from '~/api/auth.api';
import type { ChangePasswordInput } from '~/lib/schemas';

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ confirmPassword: _cp, ...data }: ChangePasswordInput) => authApi.changePassword(data),
  });
}
