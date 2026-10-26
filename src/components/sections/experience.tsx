'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Briefcase,
  CheckCircle2,
  Timer,
  Building2,
  getTechStackIcon,
} from '@/constants/icons';
import { experience } from '@/data/experience';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative py-20 sm:py-28 2xl:py-32">
      <Container>
        <SectionHeading
          eyebrow="Career Timeline"
          title="Work Experience"
          description="A chronological record of high-impact SaaS products and engineering teams I've contributed to."
        />

        <div ref={containerRef} className="relative mt-12 sm:mt-16">
          {/* Base vertical track */}
          <div
            aria-hidden="true"
            className="bg-border/60 absolute top-4 bottom-4 left-3.5 w-[2px] sm:left-5"
          />

          {/* Glowing animated scroll-driven timeline line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduced ? 1 : scaleY }}
            className="from-accent via-accent to-accent/60 shadow-[0_0_10px_var(--color-accent)] absolute top-4 bottom-4 left-3.5 w-[2px] origin-top bg-gradient-to-b sm:left-5"
          />

          <RevealGroup staggerChildren={0.12}>
            <div className="space-y-8 sm:space-y-10">
              {experience.map((item) => (
                <RevealItem key={`${item.company}-${item.start}`}>
                  <div className="relative flex items-start">
                    {/* Timeline Node on Left with pulse */}
                    <div
                      aria-hidden="true"
                      className="border-accent bg-background shadow-accent/40 absolute top-6 left-3.5 z-10 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 shadow-md sm:left-5 sm:size-7"
                    >
                      <span className="bg-accent size-2 animate-pulse rounded-full sm:size-2.5" />
                    </div>

                    {/* Timeline Card Container */}
                    <div className="ml-8 w-full sm:ml-12 md:ml-14">
                      <SpotlightCard className="p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7">
                        {/* Header info */}
                        <div className="border-border/50 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="text-foreground text-lg font-bold tracking-tight sm:text-xl">
                              {item.role}
                            </h3>
                            <p className="text-accent mt-1 flex items-center gap-1.5 text-sm font-semibold sm:text-base">
                              <Briefcase className="size-4 shrink-0" />
                              <span className="min-w-0">{item.company}</span>
                            </p>
                          </div>

                          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                            <span className="border-border/80 bg-muted/70 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium">
                              <Timer className="text-accent size-3.5" />
                              {new Date(item.start).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                },
                              )}{' '}
                              – {item.end === 'Present' ? 'Present' : item.end}
                            </span>
                            <span className="border-border/80 bg-muted/40 inline-flex items-center gap-1 rounded-full border px-2.5 py-1">
                              <Building2 className="text-muted-foreground size-3" />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        {/* Highlighted Achievements */}
                        <ul className="text-muted-foreground mt-4 space-y-2.5 text-xs leading-relaxed sm:text-sm">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="text-accent mt-0.5 size-4 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack Pills */}
                        <div className="border-border/50 mt-5 flex flex-wrap gap-1.5 border-t pt-4">
                          {item.stack.map((tech) => {
                            const TechIcon = getTechStackIcon(tech);
                            return (
                              <span
                                key={tech}
                                className="border-border/60 bg-muted/50 text-muted-foreground hover:border-accent/40 hover:bg-accent/10 hover:text-accent inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all duration-200 hover:scale-105 sm:text-xs"
                              >
                                {TechIcon && (
                                  <TechIcon className="size-3.5 shrink-0 self-center" />
                                )}
                                <span className="leading-none">{tech}</span>
                              </span>
                            );
                          })}
                        </div>
                      </SpotlightCard>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
