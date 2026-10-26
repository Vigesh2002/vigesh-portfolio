'use client';

import { useSyncExternalStore } from 'react';

/**
 * Tracks the OS `prefers-reduced-motion` setting.
 *
 * Returns `false` during SSR and the first client render so markup matches;
 * the real value lands in the effect pass before any animation is scheduled.
 */
const query = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
