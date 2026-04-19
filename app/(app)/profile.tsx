import { View } from 'react-native';

import { Text } from '~/components/ui/text';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="text-2xl font-semibold">Profile</Text>
      <Text className="text-muted-foreground">Edit profile lands in RN6.2.</Text>
    </View>
  );
}
