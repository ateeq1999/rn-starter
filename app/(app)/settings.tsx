import { View } from 'react-native';

import { Text } from '~/components/ui/text';

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="text-2xl font-semibold">Settings</Text>
      <Text className="text-muted-foreground">Security / Sessions land in RN6.4+.</Text>
    </View>
  );
}
