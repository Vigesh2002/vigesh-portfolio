import { GraduationCap, Calendar, MapPin, Trophy } from '@/constants/icons';
import { education } from '@/data/education';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SpotlightCard } from '@/components/motion/spotlight-card';

export function Education() {
  return (
    <section id="education" className="relative py-[var(--spacing-section-y)]">
      <Container>
        <SectionHeading
          eyebrow="Academic"
          title="Education & Qualifications"
          description="Formal background in computer applications and software engineering foundations."
        />

        <RevealGroup>
          <div className="mt-12 space-y-6">
            {education.map((item) => (
              <RevealItem key={`${item.degree}-${item.institution}`}>
                <SpotlightCard className="p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="border-accent/20 bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-xl border sm:size-11">
                        <GraduationCap className="size-5 sm:size-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-foreground text-lg font-bold tracking-tight sm:text-xl">
                          {item.degree}
                        </h3>
                        <p className="text-accent mt-0.5 text-sm font-semibold sm:text-base">
                          {item.institution}
                        </p>
                        <p className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                          <MapPin className="size-3.5 shrink-0" />
                          <span>{item.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                      <span className="border-border/80 bg-muted/70 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                        <Calendar className="text-accent size-3.5" />
                        <time dateTime={item.year}>{item.year}</time>
                      </span>
                      {item.cgpa && (
                        <span className="border-accent/30 bg-accent/10 text-accent inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          <Trophy className="size-3" />
                          <span>{item.cgpa}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
