import { useEffect, useRef } from 'react';
import { View, type TextInput } from 'react-native';

import { Screen } from '~/components/layout/screen';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useTwoFactor } from '~/hooks/use-two-factor';

export default function TwoFactorScreen() {
  const { mutate, isPending, error } = useTwoFactor();
  const inputRef = useRef<TextInput>(null);
  const submitted = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(code: string) {
    const digits = code.replace(/\D/g, '').slice(0, 6);
    if (digits.length === 6 && !submitted.current) {
      submitted.current = true;
      mutate({ code: digits }, { onError: () => (submitted.current = false) });
    }
  }

  return (
    <Screen>
      <View className="gap-8">
        <View className="gap-2">
          <Text className="text-3xl font-semibold">Two-factor code</Text>
          <Text className="text-muted-foreground">
            Enter the 6-digit code from your authenticator app.
          </Text>
        </View>

        <View className="gap-1.5">
          <Label>Code</Label>
          <Input
            ref={inputRef}
            keyboardType="number-pad"
            maxLength={6}
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            placeholder="123456"
            onChangeText={handleChange}
            editable={!isPending}
            className="text-center text-2xl tracking-[8px]"
          />
          {error ? <Text className="text-xs text-destructive">{error.message}</Text> : null}
        </View>
      </View>
    </Screen>
  );
}
