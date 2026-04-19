import { useMutation } from '@tanstack/react-query';

import { authApi } from '~/api/auth.api';
import type { ResetPasswordInput } from '~/lib/schemas';

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ confirmPassword: _cp, ...data }: ResetPasswordInput) => authApi.resetPassword(data),
  });
}
