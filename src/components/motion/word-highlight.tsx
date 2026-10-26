'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText, registerGsap } from '@/lib/motion/gsap';
import { START, END } from '@/lib/motion/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

type WordHighlightProps = {
  children: string;
  className?: string;
  /** Opacity of words not yet reached by the scroll position. */
  dim?: number;
};

/**
 * Scroll-linked paragraph: words brighten as the reader scrolls through them.
 *
 * Uses a scrubbed ScrollTrigger rather than opacity:0 initial states, so with
 * JS disabled (or reduced motion on) the paragraph renders at full strength.
 */
export function WordHighlight({
  children,
  className,
  dim = 0.25,
}: WordHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      registerGsap();

      let cancelled = false;
      const run = () => {
        if (cancelled || !ref.current) return;

        const split = SplitText.create(ref.current, {
          type: 'words',
          aria: 'auto',
          autoSplit: true,
        });

        gsap.set(split.words, { opacity: dim });

        gsap.to(split.words, {
          opacity: 1,
          ease: 'none',
          stagger: 0.35,
          scrollTrigger: {
            trigger: ref.current,
            start: START.scrub,
            end: END.scrub,
            scrub: true,
          },
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
    { scope: ref, dependencies: [reduced, dim] },
  );

  return (
    <p ref={ref} className={cn('text-pretty', className)}>
      {children}
    </p>
  );
}
