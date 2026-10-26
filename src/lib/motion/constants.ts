/**
 * Single source of truth for motion values. No magic numbers in components.
 */

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  curtain: 1,
  preloader: 1.1,
} as const;

export const EASE = {
  /** Matches cubic-bezier(0.16, 1, 0.3, 1) used elsewhere in globals.css. */
  expo: 'power4.out',
  out: 'power3.out',
  inOut: 'power2.inOut',
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;

/** Where a reveal fires as its trigger crosses the viewport. */
export const START = {
  reveal: 'top 85%',
  scrub: 'top 80%',
} as const;

export const END = {
  scrub: 'bottom 40%',
} as const;

/** Lenis smoothing, in seconds. Deliberately on the heavy side. */
export const LENIS_DURATION = 1.1;

/** Never let the preloader run longer than this, regardless of load state. */
export const PRELOADER_MAX_MS = 2200;

/** sessionStorage key marking the preloader as already played this session. */
export const PRELOADER_SEEN_KEY = 'portfolio:preloader-played';
