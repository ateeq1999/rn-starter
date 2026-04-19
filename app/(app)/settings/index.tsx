import { Ionicons } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Screen } from '~/components/layout/screen';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { Text } from '~/components/ui/text';
import { useSignOut } from '~/hooks/use-sign-out';

type RowProps = {
  href: Href;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

function Row({ href, icon, label }: RowProps) {
  return (
    <Link href={href} asChild>
      <Pressable className="flex-row items-center gap-3 py-4 active:opacity-70">
        <Ionicons name={icon} size={20} />
        <Text className="flex-1">{label}</Text>
        <Ionicons name="chevron-forward" size={18} />
      </Pressable>
    </Link>
  );
}

export default function SettingsIndex() {
  const { mutate: signOut, isPending } = useSignOut();

  return (
    <Screen>
      <View className="gap-4">
        <View>
          <Row href="./security" icon="lock-closed-outline" label="Security" />
          <Separator />
        </View>

        <Button variant="destructive" disabled={isPending} onPress={() => signOut()}>
          <Text>{isPending ? 'Signing out…' : 'Sign out'}</Text>
        </Button>
      </View>
    </Screen>
  );
}
