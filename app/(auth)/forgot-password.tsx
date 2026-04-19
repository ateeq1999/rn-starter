import { useState } from 'react';
import { View } from 'react-native';

import { ForgotPasswordForm } from '~/components/forms/forgot-password-form';
import { Screen } from '~/components/layout/screen';
import { Text } from '~/components/ui/text';

export default function ForgotPasswordScreen() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (sentTo) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="text-2xl font-semibold">Check your email</Text>
          <Text className="text-center text-muted-foreground">
            If an account exists for {sentTo}, we sent password-reset instructions.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-semibold">Forgot password?</Text>
          <Text className="text-muted-foreground">Enter your email and we will send a reset link.</Text>
        </View>
        <ForgotPasswordForm onSuccess={setSentTo} />
      </View>
    </Screen>
  );
}
