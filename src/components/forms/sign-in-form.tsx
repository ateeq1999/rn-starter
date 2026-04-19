import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FormField } from '~/components/forms/form-field';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useSignIn } from '~/hooks/use-sign-in';
import { signInSchema, type SignInInput } from '~/lib/schemas';

export function SignInForm() {
  const { mutate, isPending, error } = useSignIn();
  const { control, handleSubmit } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((data) => mutate(data));

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
      <FormField
        control={control}
        name="password"
        label="Password"
        inputProps={{
          secureTextEntry: true,
          autoComplete: 'password',
          textContentType: 'password',
          placeholder: '••••••••',
        }}
      />

      {error ? <Text className="text-sm text-destructive">{error.message}</Text> : null}

      <Button onPress={onSubmit} disabled={isPending}>
        <Text>{isPending ? 'Signing in…' : 'Sign in'}</Text>
      </Button>

      <View className="flex-row items-center justify-between">
        <Link href="/(auth)/forgot-password">
          <Text className="text-sm text-primary">Forgot password?</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text className="text-sm text-primary">Create account</Text>
        </Link>
      </View>
    </View>
  );
}
