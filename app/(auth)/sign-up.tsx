import { useState } from 'react';
import { View } from 'react-native';

import { SignUpForm } from '~/components/forms/sign-up-form';
import { Screen } from '~/components/layout/screen';
import { Text } from '~/components/ui/text';

export default function SignUpScreen() {
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  if (pendingEmail) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="text-2xl font-semibold">Check your email</Text>
          <Text className="text-center text-muted-foreground">
            We sent a verification link to {pendingEmail}. Tap it to finish setting up your account.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-semibold">Create account</Text>
          <Text className="text-muted-foreground">It only takes a minute.</Text>
        </View>
        <SignUpForm onSuccess={setPendingEmail} />
      </View>
    </Screen>
  );
}
