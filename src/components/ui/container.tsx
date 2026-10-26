import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Page gutter + max-width shell.
 *
 * Padding and max-width come from fluid CSS tokens in globals.css so the
 * column grows continuously with the viewport instead of jumping at each
 * Tailwind breakpoint.
 */
function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[var(--layout-max)] px-[var(--spacing-page-x)]',
        className,
      )}
      {...props}
    />
  );
}

export { Container };
