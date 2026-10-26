'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from '@/components/motion/smooth-scroll';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

/**
 * Routes in-page `#anchor` clicks through Lenis so they use the same easing as
 * scrolling, with an offset that clears the sticky navbar.
 *
 * The click listener attaches on mount (not when Lenis finishes publishing) so
 * early hash clicks never race the smooth-scroll layer. When Lenis is absent
 * (reduced motion, or before the instance exists) it falls back to a native
 * scroll so navigation always works.
 */
export function AnchorScroll() {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef(lenis);
  const reducedRef = useRef(prefersReducedMotion);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (
        event.target as HTMLElement | null
      )?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();

      const activeLenis = lenisRef.current;
      if (activeLenis) {
        // Matches the navbar height plus a little breathing room.
        activeLenis.scrollTo(target as HTMLElement, { offset: -88 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({
          top: Math.max(top, 0),
          behavior: reducedRef.current ? 'auto' : 'smooth',
        });
      }

      if (window.location.hash !== id) {
        window.history.pushState(null, '', id);
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
