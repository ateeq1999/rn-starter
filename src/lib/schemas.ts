import { z } from 'zod';

const emailField = z.string().trim().toLowerCase().email('Enter a valid email address');
const passwordField = z
  .string()
  .min(8, 'At least 8 characters')
  .max(128, 'Too long');

export const signInSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Password is required'),
});
export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, 'Name is too short').max(60, 'Name is too long'),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type SignUpInput = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: emailField,
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Missing token'),
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ['newPassword'],
    message: 'New password must differ from current',
  });
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Missing token'),
});
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const twoFactorSchema = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, 'Enter the 6-digit code'),
});
export type TwoFactorInput = z.infer<typeof twoFactorSchema>;

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(60, 'Name is too long').optional(),
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
