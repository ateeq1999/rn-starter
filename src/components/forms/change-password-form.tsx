import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FormField } from '~/components/forms/form-field';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useChangePassword } from '~/hooks/use-change-password';
import { changePasswordSchema, type ChangePasswordInput } from '~/lib/schemas';

type ChangePasswordFormProps = {
  onSuccess?: () => void;
};

export function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const { mutate, isPending, error } = useChangePassword();
  const { control, handleSubmit, reset } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit((data) =>
    mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    }),
  );

  return (
    <View className="gap-4">
      <FormField
        control={control}
        name="currentPassword"
        label="Current password"
        inputProps={{
          secureTextEntry: true,
          autoComplete: 'current-password',
          textContentType: 'password',
        }}
      />
      <FormField
        control={control}
        name="newPassword"
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
        <Text>{isPending ? 'Updating…' : 'Update password'}</Text>
      </Button>
    </View>
  );
}
