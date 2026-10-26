import { SKILL_CATEGORY_ICONS, Code2, getTechStackIcon } from '@/constants/icons';
import { skills } from '@/data/skills';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { SpotlightCard } from '@/components/motion/spotlight-card';

export function Skills() {
  return (
    <section
      id="skills"
      className="border-border/70 relative border-y py-[var(--spacing-section-y)]"
    >
      <Container>
        <SectionHeading
          eyebrow="Skills & Stack"
          title="Technologies I Build With"
          description="A specialized toolkit refined across multi-tenant production applications, scalable frontends, and real-time systems."
        />

        <RevealGroup>
          <div className="mt-[var(--spacing-section-gap)] grid gap-[var(--spacing-block)] sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => {
              const Icon = SKILL_CATEGORY_ICONS[skill.category] ?? Code2;
              return (
                <RevealItem key={skill.category}>
                  <SpotlightCard className="group hover:shadow-accent/10 flex h-full flex-col p-[var(--spacing-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <div className="border-border/50 flex items-center gap-3 border-b pb-3">
                      <div className="border-accent/20 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-accent/30 flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="text-foreground text-[length:var(--text-title)] font-bold tracking-tight">
                        {skill.category}
                      </h3>
                    </div>

                    <div className="mt-[var(--spacing-block)] flex flex-wrap gap-1.5">
                      {skill.items.map((item) => {
                        const ItemIcon = getTechStackIcon(item);
                        return (
                          <Badge
                            key={item}
                            variant="muted"
                            className="bg-muted/70 hover:border-accent/40 hover:bg-accent/10 hover:text-accent inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium transition-all duration-200 hover:scale-105"
                          >
                            {ItemIcon && (
                              <ItemIcon className="size-3.5 shrink-0 self-center" />
                            )}
                            <span className="leading-none">{item}</span>
                          </Badge>
                        );
                      })}
                    </div>
                  </SpotlightCard>
                </RevealItem>
              );
            })}
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
