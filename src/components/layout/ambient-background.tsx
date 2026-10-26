'use client';

export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden select-none"
    >
      {/* Top Ambient Glow Orb (Matches Accent Color) */}
      <div className="bg-accent/15 dark:bg-accent/10 absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full blur-[120px] transition-colors duration-500 sm:size-[800px]" />

      {/* Middle Right Accent Orb */}
      <div className="bg-accent/10 dark:bg-accent/8 absolute top-[40%] -right-40 size-[450px] rounded-full blur-[130px] transition-colors duration-500 sm:size-[600px]" />

      {/* Bottom Left Accent Orb */}
      <div className="bg-accent/10 dark:bg-accent/8 absolute top-[75%] -left-40 size-[500px] rounded-full blur-[140px] transition-colors duration-500 sm:size-[650px]" />

      {/* Subtle Grid Pattern Overlay with Radial Mask */}
      <div className="bg-grid-pattern radial-mask absolute inset-0 opacity-50 dark:opacity-35" />
    </div>
  );
}
