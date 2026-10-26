'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type SectionHeadingProps = React.ComponentProps<'div'> & {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={cn(
          'flex flex-col gap-[var(--spacing-block)]',
          align === 'center' && 'items-center text-center',
          className,
        )}
      >
        {eyebrow ? (
          <div className="border-accent/25 bg-accent/10 text-accent inline-flex max-w-full items-center gap-1.5 rounded-full border px-3.5 py-1 font-semibold tracking-wider text-[var(--text-eyebrow)] uppercase shadow-xs backdrop-blur-md">
            <span className="bg-accent size-1.5 shrink-0 animate-pulse rounded-full" />
            <span className="min-w-0">{eyebrow}</span>
          </div>
        ) : null}

        <h2 className="text-foreground text-[length:var(--text-section)] leading-[var(--leading-section)] font-extrabold tracking-tight text-balance">
          {title}
        </h2>

        {description ? (
          <p className="text-muted-foreground max-w-[var(--layout-measure)] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] lg:max-w-[var(--layout-measure-wide)]">
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-[var(--spacing-block)]',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="border-accent/25 bg-accent/10 text-accent inline-flex max-w-full items-center gap-1.5 rounded-full border px-3.5 py-1 font-semibold tracking-wider text-[var(--text-eyebrow)] uppercase shadow-xs backdrop-blur-md"
        >
          <span className="bg-accent size-1.5 shrink-0 animate-pulse rounded-full" />
          <span className="min-w-0">{eyebrow}</span>
        </motion.div>
      ) : null}

      <h2 className="text-foreground text-[length:var(--text-section)] leading-[var(--leading-section)] font-extrabold tracking-tight text-balance">
        {title}
      </h2>

      {description ? (
        <p className="text-muted-foreground max-w-[var(--layout-measure)] text-[length:var(--text-body-lg)] leading-[var(--leading-body)] lg:max-w-[var(--layout-measure-wide)]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

type SectionProps = React.ComponentProps<'section'> & {
  id: string;
  className?: string;
};

function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 py-[var(--spacing-section-y)]', className)}
      {...props}
    >
      {children}
    </section>
  );
}

export { SectionHeading, Section };
