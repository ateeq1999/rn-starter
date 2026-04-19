import { useMutation } from '@tanstack/react-query';

import { authApi } from '~/api/auth.api';
import type { SignUpInput } from '~/lib/schemas';

export function useSignUp() {
  return useMutation({
    mutationFn: ({ confirmPassword: _cp, ...data }: SignUpInput) => authApi.signUp(data),
  });
}
