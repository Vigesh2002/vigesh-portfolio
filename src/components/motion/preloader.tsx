'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsap } from '@/lib/motion/gsap';
import { DURATION, EASE, PRELOADER_MAX_MS } from '@/lib/motion/constants';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useFirstVisit, markPreloaderPlayed } from '@/hooks/use-first-visit';
import { profile } from '@/data/profile';

/**
 * Entry curtain with a 0→100 counter.
 *
 * Constraints:
 *  - Home route only (mounted by the page), first visit per session.
 *  - The counter is a fixed-duration tween, not a wait on asset loading.
 *  - Skipped entirely under `prefers-reduced-motion` or when sessionStorage is
 *    unavailable.
 *  - The static HTML behind it is fully rendered and selectable, so the page is
 *    usable even if this never lifts.
 *
 * Two deliberate choices about failure modes:
 *
 *  1. The hard cap restores scroll in its own callback rather than relying on
 *     the tween finishing. GSAP's ticker is rAF-driven, so a throttled or
 *     backgrounded tab can starve it, and a page stuck at `overflow: hidden`
 *     is far worse than a curtain that never finished animating.
 *  2. Unmounting is driven by local state, not by re-reading sessionStorage.
 *     sessionStorage writes do not notify subscribers, so deriving the render
 *     from it would leave the curtain in the DOM indefinitely.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const isFirstVisit = useFirstVisit();
  const [dismissed, setDismissed] = useState(false);

  const active = isFirstVisit && !reduced && !dismissed;

  useGSAP(
    () => {
      if (!active || !rootRef.current) return;

      registerGsap();

      // Lock scrolling while the curtain is up.
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        document.body.style.overflow = previousOverflow;
        markPreloaderPlayed();
        setDismissed(true);
      };

      const counter = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: EASE.expo },
        onComplete: finish,
      });

      tl.fromTo(
        counter,
        { value: 0 },
        {
          value: 100,
          duration: DURATION.preloader,
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.value));
            }
          },
        },
      ).to(rootRef.current, {
        yPercent: -100,
        duration: DURATION.curtain,
        ease: EASE.inOut,
      });

      // Hard cap: always unlock, even if the tween is running behind a starved
      // rAF. Snap to the end state rather than jumping progress(1), which would
      // also fast-forward the counter mid-flight.
      const cap = window.setTimeout(() => {
        if (finished) return;
        tl.progress(1, false);
        finish();
      }, PRELOADER_MAX_MS);

      return () => {
        window.clearTimeout(cap);
        // Restore scroll if we unmount mid-flight; only update state if still
        // mounted, to avoid setting state during teardown.
        if (!finished) {
          finished = true;
          document.body.style.overflow = previousOverflow;
        }
      };
    },
    { scope: rootRef, dependencies: [active] },
  );

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading site"
      className="bg-background fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      <p className="text-foreground text-4xl font-extrabold tracking-tight sm:text-6xl">
        <span ref={countRef}>0</span>
        <span className="text-accent">%</span>
      </p>
      <p className="text-muted-foreground mt-3 font-mono text-xs tracking-[0.3em] uppercase">
        {profile.name}
      </p>
    </div>
  );
}
