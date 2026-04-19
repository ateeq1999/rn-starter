export type User = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  token: string;
  user: User;
  expiresAt?: string;
};

export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  email: string;
  password: string;
  name: string;
};

export type ForgotPasswordDto = {
  email: string;
};

export type ResetPasswordDto = {
  token: string;
  password: string;
};

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};

export type VerifyEmailDto = {
  token: string;
};

export type TwoFactorDto = {
  code: string;
};

export type UpdateProfileDto = {
  name?: string;
  image?: string | null;
};

export type DeviceToken = {
  token: string;
  platform: 'ios' | 'android';
  deviceName: string;
};

export type ApiErrorPayload = {
  message: string;
  statusCode: number;
  error?: string;
};
