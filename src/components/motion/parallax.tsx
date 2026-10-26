'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsap } from '@/lib/motion/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Total travel in pixels across the element's scroll range. */
  distance?: number;
};

/**
 * Scrubbed vertical drift for a child inside an `overflow-hidden` frame.
 * The frame must be the parent and set a height; the child is over-sized so
 * there is always something to slide within.
 */
export function Parallax({
  children,
  className,
  distance = 40,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      registerGsap();

      gsap.fromTo(
        ref.current,
        { yPercent: -distance / 2 },
        {
          yPercent: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current.parentElement ?? ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced, distance] },
  );

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
};

/**
 * CSS-only horizontal marquee. The track is duplicated once and translated
 * -50%, so the seam is invisible; the duplicate is `aria-hidden` so screen
 * readers and the accessibility tree hear the content exactly once.
 */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: MarqueeProps) {
  return (
    <div className={cn('relative flex w-full overflow-hidden', className)}>
      <div
        className="flex w-max shrink-0 items-center"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex w-max shrink-0 items-center"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  );
}
