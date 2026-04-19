import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Screen } from '~/components/layout/screen';
import { Text } from '~/components/ui/text';
import { useAuthStore } from '~/store/auth.store';

export default function OAuthCallbackScreen() {
  const { token, error } = useLocalSearchParams<{ token?: string; error?: string }>();
  const setToken = useAuthStore((s) => s.setToken);
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current || !token) return;
    handled.current = true;
    setToken(token);
    router.replace('/(app)');
  }, [token, setToken]);

  if (error) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="text-2xl font-semibold">Sign-in failed</Text>
          <Text className="text-center text-destructive">{error}</Text>
          <Link href="/(auth)/sign-in" className="text-primary">
            <Text className="text-primary">Try again</Text>
          </Link>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View className="flex-1 items-center justify-center gap-3">
        <ActivityIndicator />
        <Text className="text-muted-foreground">Finishing sign-in…</Text>
      </View>
    </Screen>
  );
}
