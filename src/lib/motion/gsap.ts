/**
 * Single registration point for GSAP + the plugins this site uses.
 *
 * Importing `gsap`, `gsap/ScrollTrigger` and `gsap/SplitText` from many files
 * risks duplicate registration and, with bundler tree-shaking, plugin loss.
 * Everything goes through here instead.
 *
 * Note: `useGSAP` lives in the separate `@gsap/react` package as of GSAP 3.13.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;

/**
 * Registers the plugins once per browser session.
 * Safe to call during render on the server (no-op there).
 */
export function registerGsap(): typeof gsap {
  if (registered || typeof window === 'undefined') return gsap;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger, SplitText };
