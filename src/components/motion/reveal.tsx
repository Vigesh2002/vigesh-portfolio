'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

const getVariants = (direction: RevealDirection): Variants => {
  switch (direction) {
    case 'down':
      return {
        hidden: { opacity: 0, y: -28, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
    case 'left':
      return {
        hidden: { opacity: 0, x: -28 },
        visible: { opacity: 1, x: 0 },
      };
    case 'right':
      return {
        hidden: { opacity: 0, x: 28 },
        visible: { opacity: 1, x: 0 },
      };
    case 'scale':
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: { opacity: 1, scale: 1 },
      };
    case 'fade':
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    case 'up':
    default:
      return {
        hidden: { opacity: 0, y: 28, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };
  }
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Stagger offset in seconds applied to the entrance animation. */
  delay?: number;
  /** Direction from which the reveal travels. Defaults to 'up'. */
  direction?: RevealDirection;
  /** Duration in seconds. Defaults to 0.65s. */
  duration?: number;
};

/**
 * Premium scroll-reveal wrapper powered by Framer Motion.
 * Uses high-performance compositor-only transforms with cubic-bezier easing.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.65,
  className,
  style,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const variants = getVariants(direction);

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      variants={variants}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}


type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Delay before children start staggering */
  delayChildren?: number;
  /** Gap between consecutive staggered children */
  staggerChildren?: number;
};

/** Parent for staggered `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  delayChildren = 0.04,
  staggerChildren = 0.09,
}: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const groupVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
};

/** Child of `RevealGroup`. Must be a direct descendant to inherit the stagger. */
export function RevealItem({
  children,
  className,
  direction = 'up',
}: RevealItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = getVariants(direction);

  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
