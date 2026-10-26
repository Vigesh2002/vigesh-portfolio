'use client';

import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import { AnchorScroll } from '@/components/motion/anchor-scroll';

/**
 * Composes the global motion layer. Mounted once in the root layout so smooth
 * scroll and the progress bar survive route changes.
 *
 * Each layer opts itself out under `prefers-reduced-motion`; the preloader is
 * mounted per-route by the pages that want it (home only, first visit).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <AnchorScroll />
      {children}
    </SmoothScroll>
  );
}
