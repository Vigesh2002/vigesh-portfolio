'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface CounterProps {
  value: string; // e.g. "2+", "50+", "100+", "Playwright"
  duration?: number;
}

export function AnimatedCounter({ value, duration = 1.5 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const match = value.match(/^([\d.]+)(.*)$/);
  const numericTarget = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';
  const isDecimal = numericTarget !== null && numericTarget % 1 !== 0;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView && numericTarget !== null && !prefersReducedMotion) {
      motionValue.set(numericTarget);
    }
  }, [isInView, numericTarget, motionValue, prefersReducedMotion]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current && numericTarget !== null) {
        const formatted = isDecimal
          ? latest.toFixed(1)
          : Math.round(latest).toString();
        ref.current.textContent = `${formatted}${suffix}`;
      }
    });
  }, [springValue, isDecimal, suffix, numericTarget]);

  if (numericTarget === null) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {prefersReducedMotion ? value : `${isDecimal ? '0.0' : '0'}${suffix}`}
    </span>
  );
}
