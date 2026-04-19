import { View } from 'react-native';

import { SignInForm } from '~/components/forms/sign-in-form';
import { Screen } from '~/components/layout/screen';
import { Text } from '~/components/ui/text';

export default function SignInScreen() {
  return (
    <Screen>
      <View className="gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-semibold">Welcome back</Text>
          <Text className="text-muted-foreground">Sign in to continue.</Text>
        </View>
        <SignInForm />
      </View>
    </Screen>
  );
}
