import * as Slot from '@rn-primitives/slot';
import * as React from 'react';
import { Text as RNText } from 'react-native';

import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = React.ComponentProps<typeof RNText> & {
  asChild?: boolean;
};

function Text({ className, asChild = false, ...props }: TextProps) {
  const textClass = React.useContext(TextClassContext);
  const Comp = asChild ? Slot.Text : RNText;
  return (
    <Comp
      className={cn('text-base text-foreground web:select-text', textClass, className)}
      {...props}
    />
  );
}

export { Text, TextClassContext };
