'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface WordRotatorProps {
  words: string[];
  /** Pause after a word is fully typed (ms). */
  interval?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  className?: string;
  /**
   * Optional CSS min-width (e.g. `"20ch"`) so the layout does not jump while
   * phrases of different lengths type/delete. Text itself stays fully visible.
   */
  minWidth?: string;
}

type Phase = 'hold' | 'delete' | 'type';

/**
 * Same-line typewriter for the hero sub-headline.
 *
 * Types each phrase character-by-character, holds, deletes, then moves on.
 * Uses a solid accent colour (not background-clip) so the text is always
 * painted and readable after SplitText / nested-span restructuring.
 * No trailing caret/cursor element — minWidth reserves layout space only.
 * Under `prefers-reduced-motion` the first phrase stays fully visible with
 * no typing, deletion, or auto-advance.
 */
export function WordRotator({
  words,
  interval = 2200,
  typeSpeed = 65,
  deleteSpeed = 35,
  className,
  minWidth,
}: WordRotatorProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? '');
  const [phase, setPhase] = useState<Phase>('hold');

  useEffect(() => {
    if (reduced || words.length === 0) return;

    const current = words[index] ?? '';

    if (phase === 'hold') {
      const timer = setTimeout(() => setPhase('delete'), interval);
      return () => clearTimeout(timer);
    }

    if (phase === 'delete') {
      if (text.length === 0) {
        // Deferred so React batches the index/phase update together.
        const timer = setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
          setPhase('type');
        }, 0);
        return () => clearTimeout(timer);
      }

      const timer = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, deleteSpeed);
      return () => clearTimeout(timer);
    }

    // phase === "type"
    if (text.length < current.length) {
      const timer = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, typeSpeed);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setPhase('hold'), 0);
    return () => clearTimeout(timer);
  }, [phase, text, index, words, interval, typeSpeed, deleteSpeed, reduced]);

  // Solid accent — always visible; gradient clip breaks when text is nested
  // under SplitText word wrappers or absolutely positioned overlays.
  // No caret sibling: minWidth alone keeps layout stable across phrase lengths.
  return (
    <span
      className={`text-accent inline-block font-extrabold whitespace-nowrap tabular-nums ${className ?? ''}`.trim()}
      style={minWidth ? { minWidth } : undefined}
    >
      {reduced ? (words[0] ?? '') : text}
    </span>
  );
}
