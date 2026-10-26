import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default:
          'bg-accent text-accent-foreground shadow-md shadow-accent/25 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/35',
        outline:
          'border border-border/80 bg-card/60 backdrop-blur-md hover:border-accent/40 hover:bg-muted hover:text-foreground',
        ghost: 'hover:bg-muted/80 hover:text-foreground',
        link: 'text-accent underline-offset-4 hover:underline p-0 h-auto font-medium',
      },
      size: {
        sm: 'h-9 px-3.5 text-[var(--text-ui)] rounded-lg',
        md: 'h-11 px-5 text-[length:var(--text-body)]',
        lg: 'h-12 px-6 text-[length:var(--text-body-lg)]',
        icon: 'size-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const mergedClassName = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    const { children, ...restProps } = props as React.ComponentPropsWithRef<'button'>;
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
    }>;
    const childProps = child.props as { className?: string };
    return React.cloneElement(child, {
      ...restProps,
      ...childProps,
      className: cn(mergedClassName, childProps.className),
    });
  }

  return (
    <button
      data-slot="button"
      className={mergedClassName}
      {...(props as React.ComponentPropsWithRef<'button'>)}
    />
  );
}

export { Button, buttonVariants };
