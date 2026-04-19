import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { FormField } from '~/components/forms/form-field';
import { Screen } from '~/components/layout/screen';
import { Avatar } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { LoadingOverlay } from '~/components/ui/loading-overlay';
import { Text } from '~/components/ui/text';
import { useUpdateProfile } from '~/hooks/use-update-profile';
import { updateProfileSchema, type UpdateProfileInput } from '~/lib/schemas';
import { useAuthStore } from '~/store/auth.store';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const { mutate, isPending, isSuccess, error, reset } = useUpdateProfile();

  const { control, handleSubmit } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name ?? '' },
  });

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(reset, 2000);
    return () => clearTimeout(timer);
  }, [isSuccess, reset]);

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <Screen>
      <View className="gap-8">
        <View className="items-center gap-3">
          <Avatar uri={user?.image ?? undefined} name={user?.name} size={96} />
          <Text className="text-sm text-muted-foreground">{user?.email}</Text>
        </View>

        <View className="gap-4">
          <FormField
            control={control}
            name="name"
            label="Display name"
            inputProps={{ autoCapitalize: 'words', textContentType: 'name' }}
          />

          {error ? <Text className="text-sm text-destructive">{error.message}</Text> : null}
          {isSuccess ? <Text className="text-sm text-primary">Profile updated.</Text> : null}

          <Button onPress={onSubmit} disabled={isPending}>
            <Text>{isPending ? 'Saving…' : 'Save changes'}</Text>
          </Button>
        </View>
      </View>

      <LoadingOverlay visible={isPending} label="Saving…" />
    </Screen>
  );
}
