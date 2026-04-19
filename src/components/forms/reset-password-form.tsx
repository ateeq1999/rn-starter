import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FormField } from '~/components/forms/form-field';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useResetPassword } from '~/hooks/use-reset-password';
import { resetPasswordSchema, type ResetPasswordInput } from '~/lib/schemas';

type ResetPasswordFormProps = {
  token: string;
  onSuccess?: () => void;
};

export function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
  const { mutate, isPending, error } = useResetPassword();
  const { control, handleSubmit } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit((data) => mutate(data, { onSuccess: () => onSuccess?.() }));

  return (
    <View className="gap-4">
      <FormField
        control={control}
        name="password"
        label="New password"
        inputProps={{
          secureTextEntry: true,
          autoComplete: 'password-new',
          textContentType: 'newPassword',
        }}
      />
      <FormField
        control={control}
        name="confirmPassword"
        label="Confirm new password"
        inputProps={{ secureTextEntry: true }}
      />

      {error ? <Text className="text-sm text-destructive">{error.message}</Text> : null}

      <Button onPress={onSubmit} disabled={isPending}>
        <Text>{isPending ? 'Updating…' : 'Reset password'}</Text>
      </Button>
    </View>
  );
}
