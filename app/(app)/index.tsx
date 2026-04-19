import { View } from 'react-native';

import { Text } from '~/components/ui/text';
import { useAuthStore } from '~/store/auth.store';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);

  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="text-2xl font-semibold">Welcome{user?.name ? `, ${user.name}` : ''}</Text>
      <Text className="text-muted-foreground">Home dashboard lands in RN6.1.</Text>
    </View>
  );
}
