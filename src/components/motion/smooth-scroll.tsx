'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, registerGsap } from '@/lib/motion/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * The Lenis instance lives in a module-level store rather than React state: it
 * is a mutable external object with its own lifecycle, and publishing it that
 * way avoids a setState-in-effect cascade (which this project lints as error).
 */
type LenisListener = (instance: Lenis | null) => void;

let instance: Lenis | null = null;
const listeners = new Set<LenisListener>();

function publish(next: Lenis | null) {
  instance = next;
  listeners.forEach((listener) => listener(instance));
}

function subscribe(onChange: LenisListener) {
  listeners.add(onChange);
  // The instance may have been created before this consumer subscribed.
  onChange(instance);
  return () => {
    listeners.delete(onChange);
  };
}

/**
 * Exposes the live Lenis instance so anchor handling and components can drive
 * programmatic scrolling. Null under reduced motion, where Lenis never starts.
 */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    subscribe,
    () => instance,
    () => null,
  );
}

/**
 * Bridges Lenis smooth scrolling into GSAP's ticker so ScrollTrigger reads the
 * interpolated scroll position rather than the native one.
 *
 * Disabled entirely under `prefers-reduced-motion` — the page falls back to
 * native scrolling, which is the accessible behaviour.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    registerGsap();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    publish(lenis);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      publish(null);
    };
  }, [reduced]);

  // Fonts change text metrics, which invalidates every pinned/scrubbed trigger.
  useEffect(() => {
    if (!document.fonts) return;
    let cancelled = false;

    void document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener('load', refresh);
    window.addEventListener('popstate', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('popstate', refresh);
    };
  }, []);

  return <>{children}</>;
}
