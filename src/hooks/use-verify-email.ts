import { useMutation } from '@tanstack/react-query';

import { authApi } from '~/api/auth.api';
import type { VerifyEmailInput } from '~/lib/schemas';

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (data: VerifyEmailInput) => authApi.verifyEmail(data),
  });
}
