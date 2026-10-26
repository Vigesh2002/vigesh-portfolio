'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * High-performance 3px scroll-progress bar pinned to the top of the viewport.
 * Uses Framer Motion's useScroll with physics spring smoothing.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-accent via-accent to-accent/90 shadow-[0_0_12px_var(--color-accent)]"
      />
    </div>
  );
}
