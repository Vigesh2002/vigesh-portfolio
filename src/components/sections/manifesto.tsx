import { ArrowUpRight, MessageSquare } from '@/constants/icons';
import { profile } from '@/data/profile';
import { manifesto, closingCta } from '@/data/manifesto';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SplitReveal } from '@/components/motion/split-reveal';
import { WordHighlight } from '@/components/motion/word-highlight';
import { Marquee } from '@/components/motion/parallax';
import { Magnetic } from '@/components/motion/magnetic';

/**
 * Manifesto + closing CTA.
 *
 * Stays a server component: only the motion primitives below it are client
 * components, and all copy arrives via props from `src/data`.
 */
export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden py-[var(--spacing-section-y)]"
    >
      <Container>
        <RevealGroup>
          <div className="mx-auto max-w-[var(--layout-measure-wide)] text-center">
            <RevealItem>
              <div className="border-accent/25 bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 font-semibold tracking-wider text-[var(--text-eyebrow)] uppercase shadow-xs backdrop-blur-md">
                <span className="bg-accent size-1.5 rounded-full" />
                <span>{manifesto.eyebrow}</span>
              </div>
            </RevealItem>
          </div>

          {/* Short statements, each revealed as the reader scrolls through it. */}
          <div className="mx-auto mt-[var(--spacing-section-gap)] max-w-[var(--layout-measure-wide)] space-y-[var(--spacing-block)]">
            {manifesto.statements.map((statement) => (
              <RevealItem key={statement}>
                <WordHighlight className="text-foreground text-[length:var(--text-title)] leading-snug font-bold tracking-tight">
                  {statement}
                </WordHighlight>
              </RevealItem>
            ))}
          </div>

          {/* Dot-separated discipline line, drifting slowly.
              Wrapper is a div, not a p: Marquee renders block elements and
              markup may not nest a div inside a paragraph. */}
          <RevealItem className="mt-[var(--spacing-section-y)]">
            <div
              aria-label={`Disciplines: ${manifesto.disciplines.join(', ')}`}
              className="text-muted-foreground text-center font-mono tracking-[0.25em] text-[var(--text-ui)] uppercase"
            >
              <Marquee duration={45}>
                {manifesto.disciplines.map((item) => (
                  <span key={item} className="flex items-center">
                    <span className="px-4">{item}</span>
                    <span aria-hidden="true" className="text-accent">
                      &middot;
                    </span>
                  </span>
                ))}
              </Marquee>
            </div>
          </RevealItem>

          {/* Closing CTA */}
          <div className="mt-[var(--spacing-section-y)] flex flex-col items-center gap-[var(--spacing-block)] text-center">
            <SplitReveal
              as="h2"
              className="text-foreground mx-auto max-w-full text-center text-[length:var(--text-display)] leading-[var(--leading-display)] font-extrabold tracking-tight"
            >
              {closingCta.headline}
            </SplitReveal>

            <RevealItem>
              <p className="text-muted-foreground mx-auto max-w-[var(--layout-measure)] text-[length:var(--text-body-lg)] leading-[var(--leading-body)]">
                {closingCta.supporting}
              </p>
            </RevealItem>

            <RevealItem className="flex w-full justify-center">
              <Magnetic className="inline-flex w-auto max-w-full justify-center">
                <Button
                  asChild
                  size="lg"
                  className="group shadow-accent/25 hover:shadow-accent/40 inline-flex w-auto max-w-full items-center justify-center gap-2.5 px-6 py-3.5 shadow-lg transition-all hover:scale-105"
                >
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap text-xs font-semibold xs:text-sm sm:text-base"
                  >
                    <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
                    <span>{profile.email}</span>
                    <ArrowUpRight
                      className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </Magnetic>
            </RevealItem>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
