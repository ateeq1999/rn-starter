import { ActivityIndicator, View } from 'react-native';

import { Text } from '~/components/ui/text';

type LoadingOverlayProps = {
  visible: boolean;
  label?: string;
};

export function LoadingOverlay({ visible, label }: LoadingOverlayProps) {
  if (!visible) return null;
  return (
    <View
      pointerEvents="auto"
      className="absolute inset-0 items-center justify-center gap-2 bg-background/70"
    >
      <ActivityIndicator />
      {label ? <Text className="text-sm text-muted-foreground">{label}</Text> : null}
    </View>
  );
}
