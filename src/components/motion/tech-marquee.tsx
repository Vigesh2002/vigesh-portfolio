'use client';

import React from 'react';
import { TECH_MARQUEE_STACK } from '@/constants/icons';

export function TechMarquee() {
  return (
    <div className="group border-border/60 bg-card/30 relative w-full overflow-hidden border-y py-5 backdrop-blur-md">
      {/* Left/Right Gradient Blur Fade Masks */}
      <div className="from-background pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r to-transparent sm:w-28" />
      <div className="from-background pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l to-transparent sm:w-28" />

      {/* Infinite scrolling dual-track (100% seamless, zero glitch) */}
      <div className="flex w-max">
        {/* Track 1 */}
        <div className="animate-marquee flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]">
          {TECH_MARQUEE_STACK.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-${idx}`}
                className="border-border/70 bg-card/80 text-foreground/90 hover:border-accent hover:bg-accent/10 hover:text-accent flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-md transition-all hover:scale-105"
              >
                <Icon className={`size-3.5 shrink-0 self-center ${item.color}`} />
                <span className="leading-none whitespace-nowrap">{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Track 2 (exact duplicate for seamless wrap) */}
        <div
          aria-hidden="true"
          className="animate-marquee flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]"
        >
          {TECH_MARQUEE_STACK.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-dup-${idx}`}
                className="border-border/70 bg-card/80 text-foreground/90 hover:border-accent hover:bg-accent/10 hover:text-accent flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs backdrop-blur-md transition-all hover:scale-105"
              >
                <Icon className={`size-3.5 shrink-0 self-center ${item.color}`} />
                <span className="leading-none whitespace-nowrap">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
