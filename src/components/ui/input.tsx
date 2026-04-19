import * as React from 'react';
import { TextInput } from 'react-native';

import { cn } from '~/lib/utils';

type InputProps = React.ComponentProps<typeof TextInput>;

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, placeholderClassName, ...props }, ref) => (
    <TextInput
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground file:border-0 file:bg-transparent file:font-medium web:flex web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        props.editable === false && 'opacity-50 web:cursor-not-allowed',
        className,
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
export type { InputProps };
