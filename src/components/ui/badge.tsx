import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium [&_svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent text-accent-foreground',
        outline: 'border-border text-muted-foreground',
        muted: 'border-transparent bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

export type BadgeProps = React.ComponentPropsWithRef<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const mergedClassName = cn(badgeVariants({ variant }), className);

  if (asChild) {
    const { children } = props as React.ComponentPropsWithRef<'span'>;
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
    }>;
    const childProps = child.props as { className?: string };
    return React.cloneElement(child, {
      className: cn(mergedClassName, childProps.className),
    });
  }

  return <span data-slot="badge" className={mergedClassName} {...props} />;
}

export { Badge, badgeVariants };
