import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FormField } from '~/components/forms/form-field';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useSignUp } from '~/hooks/use-sign-up';
import { signUpSchema, type SignUpInput } from '~/lib/schemas';

type SignUpFormProps = {
  onSuccess?: (email: string) => void;
};

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const { mutate, isPending, error } = useSignUp();
  const { control, handleSubmit } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit((data) =>
    mutate(data, { onSuccess: () => onSuccess?.(data.email) }),
  );

  return (
    <View className="gap-4">
      <FormField
        control={control}
        name="name"
        label="Name"
        inputProps={{ autoCapitalize: 'words', textContentType: 'name', placeholder: 'Jane Doe' }}
      />
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
      <FormField
        control={control}
        name="password"
        label="Password"
        inputProps={{
          secureTextEntry: true,
          autoComplete: 'password-new',
          textContentType: 'newPassword',
          placeholder: 'At least 8 characters',
        }}
      />
      <FormField
        control={control}
        name="confirmPassword"
        label="Confirm password"
        inputProps={{ secureTextEntry: true, placeholder: 'Re-enter password' }}
      />

      {error ? <Text className="text-sm text-destructive">{error.message}</Text> : null}

      <Button onPress={onSubmit} disabled={isPending}>
        <Text>{isPending ? 'Creating account…' : 'Create account'}</Text>
      </Button>
    </View>
  );
}
