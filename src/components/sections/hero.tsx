'use client';

import { ArrowRight, Download } from '@/constants/icons';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { stats } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { WordRotator } from '@/components/motion/animated-text';
import { AnimatedCounter } from '@/components/motion/counter';
import { InteractiveTerminal } from '@/components/motion/interactive-terminal';
import { TechMarquee } from '@/components/motion/tech-marquee';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { Magnetic } from '@/components/motion/magnetic';
import { LiveClock } from '@/components/motion/live-clock';
import { SplitReveal } from '@/components/motion/split-reveal';

export function Hero() {
  const rotatingWords = [
    'Multi-Tenant SaaS',
    'Real-Time WebApps',
    'Design Systems',
    'Automated E2E Tests',
    'High-Performance UI',
  ];
  const longestRotatingWord = rotatingWords.reduce((a, b) =>
    b.length > a.length ? b : a,
  );

  return (
    <section
      id="hero"
      className="relative pt-[var(--spacing-block)] sm:pt-[var(--spacing-section-gap)]"
    >
      <Container>
        <div className="grid items-center gap-[var(--spacing-section-gap)] pb-[var(--spacing-section-y)] lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Intro & Interactive Word Rotator */}
          <div className="min-w-0 lg:col-span-7">
            <RevealGroup>
              {/* Status Badge & Live Clock Row */}
              <RevealItem>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="border-accent/30 bg-accent/10 text-accent inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 font-semibold text-[var(--text-eyebrow)] shadow-xs backdrop-blur-md sm:px-3.5">
                    <span className="relative flex size-2 shrink-0">
                      <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                      <span className="bg-accent relative inline-flex size-2 rounded-full" />
                    </span>
                    <span className="min-w-0">
                      Available for Full-time Roles
                    </span>
                  </div>

                  <LiveClock />
                </div>
              </RevealItem>

              {/* Main Heading */}
              <RevealItem className="mt-[var(--spacing-block)] sm:mt-[var(--spacing-block)]">
                <SplitReveal
                  as="h1"
                  immediate
                  delay={0.15}
                  className="text-foreground text-[length:var(--text-display)] leading-[var(--leading-display)] font-extrabold tracking-tight"
                >
                  <span>{`Hi, I'm `}</span>
                  <span
                    data-split-accent
                    className="from-accent via-accent to-accent-hover text-accent bg-gradient-to-r bg-clip-text"
                  >
                    {profile.name}
                  </span>
                  <span>.</span>
                </SplitReveal>

                <div className="text-foreground/90 mt-[var(--spacing-block)] text-[length:var(--text-lead)] leading-snug font-bold tracking-tight">
                  {/* Prefix + live typewriter in normal flow — text always paints.
                      min-width in ch keeps layout stable across phrase lengths. */}
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="whitespace-nowrap">
                      Frontend Engineer building
                    </span>
                    <WordRotator
                      words={rotatingWords}
                      minWidth={`${longestRotatingWord.length}ch`}
                    />
                  </div>
                </div>
              </RevealItem>

              {/* Tagline */}
              <RevealItem className="mt-[var(--spacing-block)] max-w-[var(--layout-measure)]">
                <p className="text-muted-foreground text-[length:var(--text-body)] leading-[var(--leading-body)]">
                  {profile.tagline}
                </p>
              </RevealItem>

              {/* Action Buttons with Magnetic cursor pull (mouse only) */}
              <RevealItem className="mt-[var(--spacing-section-gap)] flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="shadow-accent/25 hover:shadow-accent/40 w-full gap-2 shadow-lg transition-all hover:scale-105 sm:w-auto"
                  >
                    <Link href="#projects">
                      View Featured Work
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </Magnetic>

                <Magnetic className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="glass-card w-full gap-2 transition-transform hover:scale-105 sm:w-auto"
                  >
                    <Link href={profile.links.resume} download>
                      <Download className="size-4" aria-hidden="true" />
                      Download Resume
                    </Link>
                  </Button>
                </Magnetic>
              </RevealItem>

              {/* Animated Stats Cards with Spotlight */}
              <RevealItem className="mt-[var(--spacing-section-gap)] grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                {stats.map((stat) => (
                  <SpotlightCard
                    key={stat.label}
                    className="p-[var(--spacing-block)] transition-all hover:-translate-y-1"
                  >
                    <dd className="text-foreground text-[length:var(--text-stat)] font-extrabold tracking-tight">
                      <AnimatedCounter value={stat.value} />
                    </dd>
                    <dt className="text-muted-foreground mt-1 font-medium text-[var(--text-eyebrow)]">
                      {stat.label}
                    </dt>
                  </SpotlightCard>
                ))}
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Right Column: Live Interactive Developer Terminal */}
          <div className="w-full max-w-full min-w-0 lg:col-span-5">
            <RevealGroup>
              <RevealItem>
                <InteractiveTerminal />
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </Container>

      {/* Infinite Moving Tech Marquee */}
      <TechMarquee />
    </section>
  );
}
