import * as React from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { View, type TextInput } from 'react-native';

import { Input, type InputProps } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

type FormFieldProps<TValues extends FieldValues> = {
  control: Control<TValues>;
  name: FieldPath<TValues>;
  label?: string;
  className?: string;
  inputProps?: InputProps;
  inputRef?: React.Ref<TextInput>;
};

export function FormField<TValues extends FieldValues>({
  control,
  name,
  label,
  className,
  inputProps,
  inputRef,
}: FormFieldProps<TValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={cn('gap-1.5', className)}>
          {label ? <Label>{label}</Label> : null}
          <Input
            ref={inputRef}
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            aria-invalid={!!error}
            className={cn(error && 'border-destructive')}
            {...inputProps}
          />
          {error?.message ? (
            <Text className="text-xs text-destructive">{error.message}</Text>
          ) : null}
        </View>
      )}
    />
  );
}
