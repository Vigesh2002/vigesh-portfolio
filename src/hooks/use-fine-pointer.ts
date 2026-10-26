'use client';

import { useSyncExternalStore } from 'react';

/** `(hover: hover) and (pointer: fine)` — true for mouse/trackpad, false for touch. */
const query = '(hover: hover) and (pointer: fine)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/**
 * Gates the custom cursor. False on touch devices and in headless test runs
 * that don't advertise a fine pointer, which keeps the native cursor visible.
 */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
