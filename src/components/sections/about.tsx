import { Navigation, Zap, ReactIcon, Globe2, Rocket, Award, Terminal } from '@/constants/icons';
import { profile } from '@/data/profile';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { WordHighlight } from '@/components/motion/word-highlight';

export function About() {
  return (
    <section id="about" className="relative py-[var(--spacing-section-y)]">
      <Container>
        <SectionHeading
          eyebrow="Background"
          title="Engineering Philosophy"
          description="Frontend Engineer specialized in architecting scalable SaaS applications, real-time products, and production component libraries."
          align="left"
        />

        <RevealGroup>
          <div className="mt-[var(--spacing-section-gap)] grid gap-[var(--spacing-block)] lg:grid-cols-12">
            {/* Main Narrative Card with Spotlight */}
            <RevealItem className="lg:col-span-7">
              <SpotlightCard className="flex h-full flex-col justify-between p-[var(--spacing-card)] shadow-xl">
                <div className="space-y-[var(--spacing-block)]">
                  <div className="border-accent/30 bg-accent/10 text-accent inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1 font-semibold text-[var(--text-ui)] backdrop-blur-md">
                    <Zap className="size-3.5 shrink-0" />
                    <span className="min-w-0">
                      Product-Minded Frontend Engineer
                    </span>
                  </div>

                  <h3 className="text-foreground text-[length:var(--text-title)] font-bold tracking-tight">
                    Delivering complete frontend solutions from architecture to
                    production deployment.
                  </h3>

                  <WordHighlight className="text-muted-foreground text-[length:var(--text-body)] leading-[var(--leading-body)]">
                    I&apos;m Vigesh D, a Frontend Engineer with 2+ years of
                    experience building React products. For the past year and a
                    half, I&apos;ve worked on the frontend of HustleBot, a
                    multi-tenant marketing platform for WhatsApp and email.
                  </WordHighlight>

                  <p className="text-muted-foreground text-[length:var(--text-body)] leading-[var(--leading-body)]">
                    My experience covers building visual flow builders with React Flow
                    and Dagre, real-time team inboxes on Socket.IO adhering to WhatsApp&apos;s
                    24-hour window, WhatsApp template creators with live phone previews,
                    rule-based CRM segment builders with nested AND/OR groups, email tools
                    with Unlayer integration, prepaid wallet billing, and comprehensive
                    Playwright E2E test suites. I enjoy taking features from the first
                    component all the way to production, writing tests for the parts that can&apos;t break.
                  </p>
                </div>

                <div className="border-border/60 text-muted-foreground mt-[var(--spacing-section-gap)] flex flex-wrap gap-2 border-t pt-4 font-medium text-[var(--text-ui)]">
                  <span className="border-border/60 bg-muted/60 hover:border-accent/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 transition-all">
                    <Terminal className="text-accent size-3.5" /> Clean
                    Architecture
                  </span>
                  <span className="border-border/60 bg-muted/60 hover:border-accent/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 transition-all">
                    <Rocket className="text-accent size-3.5" /> Blazing
                    Performance
                  </span>
                  <span className="border-border/60 bg-muted/60 hover:border-accent/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 transition-all">
                    <Award className="text-accent size-3.5" /> 100% Type-Safe
                    &amp; Tested
                  </span>
                </div>
              </SpotlightCard>
            </RevealItem>

            {/* Side Bento Cards with Spotlight */}
            <div className="grid gap-[var(--spacing-block)] sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {/* Location & Availability Card */}
              <RevealItem>
                <SpotlightCard className="p-[var(--spacing-card)] shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground font-semibold tracking-wider text-[var(--text-ui)] uppercase">
                      Location &amp; Timezone
                    </span>
                    <Globe2 className="text-accent size-4 shrink-0" />
                  </div>
                  <p className="text-foreground mt-3 flex items-center gap-2 text-[length:var(--text-title)] font-bold">
                    <Navigation className="text-accent size-4 shrink-0" />
                    <span className="min-w-0">{profile.location}</span>
                  </p>
                  <p className="text-muted-foreground mt-1 text-[var(--text-ui)]">
                    Available for Full-Time Roles (On-site, Hybrid &amp; Remote)
                  </p>
                </SpotlightCard>
              </RevealItem>

              {/* Core Stack Card */}
              <RevealItem>
                <SpotlightCard className="p-[var(--spacing-card)] shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground font-semibold tracking-wider text-[var(--text-ui)] uppercase">
                      Core Frameworks
                    </span>
                    <ReactIcon className="text-accent size-4 shrink-0" />
                  </div>
                  <p className="text-foreground mt-3 text-[length:var(--text-body-lg)] font-bold">
                    React 19 · Next.js · TypeScript
                  </p>
                  <p className="text-muted-foreground mt-1 text-[var(--text-ui)]">
                    Zustand · TanStack Query · Socket.IO · Playwright
                  </p>
                </SpotlightCard>
              </RevealItem>
            </div>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
