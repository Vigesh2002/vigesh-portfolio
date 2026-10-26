'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText, registerGsap } from '@/lib/motion/gsap';
import { DURATION, EASE, STAGGER, START } from '@/lib/motion/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

type SplitRevealProps = {
  /**
   * Headline content. Splitting operates on the rendered text nodes, so nested
   * marks (e.g. an accent-coloured name) survive and the copy stays selectable.
   */
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll — used for the hero. */
  immediate?: boolean;
};

/** Allows the polymorphic tag to receive a ref without a wrapper element. */
type TagProps = {
  ref: React.Ref<HTMLHeadingElement & HTMLParagraphElement>;
} & React.ComponentPropsWithoutRef<'h1'>;

/**
 * Line-masked word reveal for headlines.
 *
 * Accessibility: the text is the element's own content and SplitText's
 * `aria: "auto"` keeps one readable node, so screen readers announce the
 * sentence rather than each word. Nothing is hidden by CSS, so a failed script
 * leaves a fully visible headline.
 */
export function SplitReveal({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  immediate = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      registerGsap();

      // Splitting before webfonts settle measures the fallback face and shifts
      // layout once the real font swaps in.
      let cancelled = false;
      const run = () => {
        if (cancelled || !ref.current) return;

        const split = SplitText.create(ref.current, {
          type: 'lines,words',
          mask: 'lines',
          aria: 'auto',
          autoSplit: true,
        });

        // SplitText moves text into nested word elements. `bg-clip-text` +
        // `text-transparent` on a parent does not paint into those children, so
        // an accent-coloured name can render fully invisible. Re-apply the
        // gradient utilities on every split word under marked accent nodes.
        ref.current
          .querySelectorAll<HTMLElement>('[data-split-accent]')
          .forEach((accent) => {
            const gradientClasses = [
              'bg-gradient-to-r',
              'from-accent',
              'via-accent',
              'to-accent-hover',
              'bg-clip-text',
              'text-transparent',
            ];
            accent.classList.add(...gradientClasses);
            accent
              .querySelectorAll<HTMLElement>('[aria-hidden="true"]')
              .forEach((word) => {
                word.classList.add(...gradientClasses);
              });
          });

        gsap.from(split.words, {
          yPercent: 118,
          duration: DURATION.slow,
          ease: EASE.expo,
          stagger: STAGGER.tight,
          delay,
          ...(immediate
            ? {}
            : {
                scrollTrigger: {
                  trigger: ref.current,
                  start: START.reveal,
                  once: true,
                },
              }),
        });
      };

      if (document.fonts?.status === 'loaded') {
        run();
      } else {
        void document.fonts?.ready.then(run);
      }

      return () => {
        cancelled = true;
      };
    },
    { scope: ref, dependencies: [reduced, delay, immediate] },
  );

  const Component = Tag as unknown as React.ElementType<TagProps>;

  return (
    <Component ref={ref} className={cn('text-balance', className)}>
      {children}
    </Component>
  );
}
