'use client';

import { useSyncExternalStore } from 'react';
import { PRELOADER_SEEN_KEY } from '@/lib/motion/constants';

/**
 * True when the preloader has NOT yet played in this browser session.
 *
 * Reads sessionStorage as an external store so the answer is available during
 * the first client render (no effect + setState cascade, no hydration mismatch
 * because the server snapshot is always `false`).
 */
const emptySubscribe = () => () => {};

export function useFirstVisit(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return sessionStorage.getItem(PRELOADER_SEEN_KEY) !== '1';
      } catch {
        // Storage blocked (private mode / policy) — never replay the curtain.
        return false;
      }
    },
    () => false,
  );
}

export function markPreloaderPlayed() {
  try {
    sessionStorage.setItem(PRELOADER_SEEN_KEY, '1');
  } catch {
    // Non-fatal: worst case the curtain replays next navigation.
  }
}
