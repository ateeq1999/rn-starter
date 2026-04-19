import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

import { Text } from '~/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View className="flex-1 items-center justify-center gap-3 bg-background px-6">
        <Text className="text-2xl font-semibold">This screen does not exist.</Text>
        <Link href="/" className="text-primary underline">
          <Text>Go to home</Text>
        </Link>
      </View>
    </>
  );
}
