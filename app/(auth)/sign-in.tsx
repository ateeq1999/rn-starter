import { View } from 'react-native';

import { Text } from '~/components/ui/text';

export default function SignInScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="text-2xl font-semibold">Sign in</Text>
      <Text className="text-muted-foreground">Form lands in RN5.1.</Text>
    </View>
  );
}
