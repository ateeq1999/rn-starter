import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Screen } from '~/components/layout/screen';
import { Text } from '~/components/ui/text';
import { useVerifyEmail } from '~/hooks/use-verify-email';

export default function VerifyEmailScreen() {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const { mutate, isPending, isSuccess, error } = useVerifyEmail();
  const attempted = useRef(false);

  useEffect(() => {
    if (token && !attempted.current) {
      attempted.current = true;
      mutate({ token });
    }
  }, [token, mutate]);

  return (
    <Screen>
      <View className="flex-1 items-center justify-center gap-3">
        {!token ? (
          <>
            <Text className="text-2xl font-semibold">Missing verification token</Text>
            <Text className="text-center text-muted-foreground">
              Open the link from your verification email to continue.
            </Text>
          </>
        ) : isPending ? (
          <>
            <ActivityIndicator />
            <Text className="text-muted-foreground">Verifying…</Text>
          </>
        ) : isSuccess ? (
          <>
            <Text className="text-2xl font-semibold">Email verified</Text>
            <Link href="/(auth)/sign-in" className="text-primary">
              <Text className="text-primary">Continue to sign in</Text>
            </Link>
          </>
        ) : error ? (
          <>
            <Text className="text-2xl font-semibold">Verification failed</Text>
            <Text className="text-center text-destructive">{error.message}</Text>
          </>
        ) : null}
      </View>
    </Screen>
  );
}
