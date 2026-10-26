'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently in view so the navbar can highlight it.
 * Uses IntersectionObserver against the section elements themselves.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // Bias the viewport band towards the upper third so a section becomes
        // "active" as it settles under the navbar rather than when half of it
        // has already scrolled past.
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
