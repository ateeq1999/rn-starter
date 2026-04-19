import { Image } from 'expo-image';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

type AvatarProps = {
  uri?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
  onPress?: () => void;
};

function initialsOf(name?: string | null): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '?';
}

export function Avatar({ uri, name, size = 40, className, onPress }: AvatarProps) {
  const content = uri ? (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      contentFit="cover"
      transition={150}
    />
  ) : (
    <View
      className={cn('items-center justify-center bg-muted')}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    >
      <Text className="font-semibold text-muted-foreground" style={{ fontSize: size * 0.4 }}>
        {initialsOf(name)}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} className={cn('active:opacity-80', className)}>
        {content}
      </Pressable>
    );
  }
  return <View className={className}>{content}</View>;
}
