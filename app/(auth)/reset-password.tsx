import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { ResetPasswordForm } from '~/components/forms/reset-password-form';
import { Screen } from '~/components/layout/screen';
import { Text } from '~/components/ui/text';

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="text-2xl font-semibold">Missing reset token</Text>
          <Text className="text-center text-muted-foreground">
            Open the link from your password-reset email to continue.
          </Text>
        </View>
      </Screen>
    );
  }

  if (done) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="text-2xl font-semibold">Password updated</Text>
          <Link href="/(auth)/sign-in" className="text-primary">
            <Text className="text-primary">Back to sign in</Text>
          </Link>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-semibold">Reset password</Text>
          <Text className="text-muted-foreground">Choose a new password for your account.</Text>
        </View>
        <ResetPasswordForm token={token} onSuccess={() => setDone(true)} />
      </View>
    </Screen>
  );
}
