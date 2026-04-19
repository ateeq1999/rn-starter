import { useMutation } from '@tanstack/react-query';

import { authApi } from '~/api/auth.api';
import type { ForgotPasswordInput } from '~/lib/schemas';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => authApi.forgotPassword(data),
  });
}
