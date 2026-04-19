import { api } from '~/api/client';
import type {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  Session,
  SignInDto,
  SignUpDto,
  TwoFactorDto,
  User,
  VerifyEmailDto,
} from '~/types/api';

export const authApi = {
  signIn: (data: SignInDto) =>
    api.post<Session>('/api/auth/sign-in', data, { params: { token: true } }),

  signUp: (data: SignUpDto) => api.post<{ user: User }>('/api/auth/sign-up', data),

  signOut: () => api.post<void>('/api/auth/sign-out'),

  getSession: () => api.get<Session>('/api/auth/session'),

  forgotPassword: (data: ForgotPasswordDto) => api.post<void>('/api/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordDto) => api.post<void>('/api/auth/reset-password', data),

  changePassword: (data: ChangePasswordDto) => api.post<void>('/api/auth/change-password', data),

  verifyEmail: (data: VerifyEmailDto) => api.post<void>('/api/auth/verify-email', data),

  twoFactor: (data: TwoFactorDto) => api.post<Session>('/api/auth/two-factor', data),

  refreshToken: () => api.post<{ token: string }>('/api/auth/refresh-token'),
};
