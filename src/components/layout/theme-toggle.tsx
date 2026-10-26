'use client';

import { useRef } from 'react';
import { Moon, Sun } from '@/constants/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/** View Transitions need both halves of the API; Chromium-only today. */
function supportsViewTransitions() {
  return (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function'
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  const handleClick = () => {
    if (prefersReducedMotion || !supportsViewTransitions()) {
      setTheme(nextTheme);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => setTheme(nextTheme));

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 0.5,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={mounted ? `Switch to ${nextTheme} theme` : 'Toggle theme'}
      onClick={handleClick}
      className="border-border text-muted-foreground hover:bg-muted hover:text-foreground relative inline-flex size-10 min-h-10 min-w-10 items-center justify-center overflow-hidden rounded-lg border transition-colors"
    >
      <AnimatePresence initial={false} mode="wait">
        {mounted && isDark ? (
          <motion.span
            key="sun"
            initial={
              prefersReducedMotion
                ? false
                : { rotate: -90, scale: 0.4, opacity: 0 }
            }
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { rotate: 90, scale: 0.4, opacity: 0 }
            }
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute"
          >
            <Sun className="size-4" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={
              prefersReducedMotion
                ? false
                : { rotate: 90, scale: 0.4, opacity: 0 }
            }
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { rotate: -90, scale: 0.4, opacity: 0 }
            }
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute"
          >
            <Moon className="size-4" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
