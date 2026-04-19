import { View } from 'react-native';

import { Screen } from '~/components/layout/screen';
import { Avatar } from '~/components/ui/avatar';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { useSession } from '~/hooks/use-session';
import { useAuthStore } from '~/store/auth.store';

export default function HomeScreen() {
  const storedUser = useAuthStore((s) => s.user);
  const { data } = useSession();
  const user = data?.user ?? storedUser;

  return (
    <Screen>
      <View className="gap-6">
        <View className="flex-row items-center gap-4">
          <Avatar uri={user?.image ?? undefined} name={user?.name} size={56} />
          <View className="flex-1">
            <Text className="text-sm text-muted-foreground">Welcome back</Text>
            <Text className="text-xl font-semibold">{user?.name ?? 'Guest'}</Text>
          </View>
        </View>

        <Card className="gap-1 p-4">
          <Text className="text-sm text-muted-foreground">Email</Text>
          <Text className="text-base">{user?.email ?? '—'}</Text>
        </Card>

        <Card className="gap-1 p-4">
          <Text className="text-sm text-muted-foreground">Email verified</Text>
          <Text className="text-base">{user?.emailVerified ? 'Yes' : 'No'}</Text>
        </Card>
      </View>
    </Screen>
  );
}
