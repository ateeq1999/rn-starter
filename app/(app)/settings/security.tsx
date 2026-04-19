import { View } from 'react-native';

import { ChangePasswordForm } from '~/components/forms/change-password-form';
import { Screen } from '~/components/layout/screen';
import { Text } from '~/components/ui/text';

export default function SecurityScreen() {
  return (
    <Screen>
      <View className="gap-6">
        <View className="gap-1">
          <Text className="text-2xl font-semibold">Change password</Text>
          <Text className="text-muted-foreground">
            Use at least 8 characters. Don&apos;t reuse a password from another site.
          </Text>
        </View>
        <ChangePasswordForm />
      </View>
    </Screen>
  );
}
