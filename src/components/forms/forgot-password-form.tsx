import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FormField } from '~/components/forms/form-field';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useForgotPassword } from '~/hooks/use-forgot-password';
import { forgotPasswordSchema, type ForgotPasswordInput } from '~/lib/schemas';

type ForgotPasswordFormProps = {
  onSuccess?: (email: string) => void;
};

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const { mutate, isPending, error } = useForgotPassword();
  const { control, handleSubmit } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit((data) =>
    mutate(data, { onSuccess: () => onSuccess?.(data.email) }),
  );

  return (
    <View className="gap-4">
      <FormField
        control={control}
        name="email"
        label="Email"
        inputProps={{
          autoCapitalize: 'none',
          autoComplete: 'email',
          keyboardType: 'email-address',
          textContentType: 'emailAddress',
          placeholder: 'you@example.com',
        }}
      />

      {error ? <Text className="text-sm text-destructive">{error.message}</Text> : null}

      <Button onPress={onSubmit} disabled={isPending}>
        <Text>{isPending ? 'Sending…' : 'Send reset link'}</Text>
      </Button>
    </View>
  );
}
