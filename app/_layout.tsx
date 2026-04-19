import '../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { queryClient } from '~/lib/query-client';
import { useAuthStore } from '~/store/auth.store';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore — already hidden or not yet shown */
});

export default function RootLayout() {
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme('system');
  }, [setColorScheme]);

  useEffect(() => {
    if (hasHydrated) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [hasHydrated]);

  if (!hasHydrated) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
