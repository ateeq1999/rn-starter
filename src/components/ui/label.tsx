import * as React from 'react';

import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

type LabelProps = React.ComponentProps<typeof Text>;

function Label({ className, ...props }: LabelProps) {
  return (
    <Text
      className={cn('text-sm font-medium leading-none text-foreground', className)}
      {...props}
    />
  );
}

export { Label };
export type { LabelProps };
