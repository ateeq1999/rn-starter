import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '~/lib/utils';

type ScreenProps = React.PropsWithChildren<{
  className?: string;
  contentClassName?: string;
  scroll?: boolean;
}>;

export function Screen({ children, className, contentClassName, scroll = true }: ScreenProps) {
  return (
    <SafeAreaView className={cn('flex-1 bg-background', className)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {scroll ? (
          <ScrollView
            contentContainerClassName={cn('flex-grow px-6 py-6', contentClassName)}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {children}
          </ScrollView>
        ) : (
          <View className={cn('flex-1 px-6 py-6', contentClassName)}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
