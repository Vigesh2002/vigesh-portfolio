'use client';

import { useEffect, useState } from 'react';

/** True once the page has scrolled past `threshold` pixels. */
export function useScrollPosition(threshold = 8): boolean {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > threshold);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return hasScrolled;
}
