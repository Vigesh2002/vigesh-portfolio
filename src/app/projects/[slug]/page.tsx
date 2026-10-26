import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Star,
  getTechStackIcon,
} from '@/constants/icons';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    ...projects.map((project) => ({ slug: project.slug })),
    { slug: 'voice-activated-virtual-assistant' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug) ?? projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found — Vigesh D',
    };
  }

  return {
    title: `${project.title} — Vigesh D`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug) ?? projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  return (
    <article className="py-16 sm:py-24 lg:py-28">
      <Container>
        {/* Top Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground -ml-2 gap-2"
          >
            <Link href="/projects">
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Back to all projects</span>
            </Link>
          </Button>

          {project.featured && (
            <div className="border-accent/30 bg-accent/10 text-accent inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Star className="size-3.5 fill-current" />
              <span>Featured Work</span>
            </div>
          )}
        </div>

        {/* Heading & Summary */}
        <SectionHeading
          eyebrow="Case Study"
          title={project.title}
          description={project.summary}
          align="left"
        />

        {/* Hero Preview Image with Ambient Frame */}
        <div className="border-border/80 bg-card/60 mt-10 overflow-hidden rounded-2xl border shadow-2xl sm:mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
            />
            <div className="from-background/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>
        </div>

        {/* Two-Column Details Layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sidebar / Tech Stack & Actions (Col 4) */}
          <aside className="space-y-6 lg:col-span-4">
            <SpotlightCard className="p-6 shadow-xl">
              <h3 className="text-foreground text-sm font-bold tracking-wider uppercase">
                Technologies Used
              </h3>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => {
                  const TechIcon = getTechStackIcon(tech);
                  return (
                    <Badge
                      key={tech}
                      variant="muted"
                      className="border-border/60 bg-muted/60 hover:border-accent/40 hover:bg-accent/10 hover:text-accent inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all"
                    >
                      {TechIcon && (
                        <TechIcon className="size-3.5 shrink-0 self-center" />
                      )}
                      <span>{tech}</span>
                    </Badge>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="border-border/50 mt-6 flex flex-col gap-2.5 border-t pt-5">
                {project.liveUrl && (
                  <Button asChild className="w-full gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        {project.slug === 'hustlebot-admin-portal'
                          ? 'Open Admin Portal'
                          : 'Visit Live Platform'}
                      </span>
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </Button>
                )}

                {project.repoUrl && (
                  <Button asChild variant="outline" className="w-full gap-2">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="size-4" />
                      <span>Source Code</span>
                    </a>
                  </Button>
                )}

                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href="/#contact">
                    <span>Contact About This Project</span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </SpotlightCard>
          </aside>

          {/* Main Content / Highlights & Achievements (Col 8) */}
          <div className="space-y-6 lg:col-span-8">
            <div className="border-border/50 border-b pb-4">
              <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                Architecture &amp; Key Achievements
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Detailed technical breakdown and production engineering deliverables.
              </p>
            </div>

            <div className="space-y-4">
              {project.highlights.map((highlight, index) => (
                <SpotlightCard
                  key={`${project.slug}-highlight-${index}`}
                  className="flex items-start gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 sm:p-6"
                >
                  <div className="border-accent/20 bg-accent/10 text-accent flex size-8 shrink-0 items-center justify-center rounded-lg border sm:size-9">
                    <CheckCircle2 className="size-4 sm:size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground/90 text-sm leading-relaxed sm:text-base">
                      {highlight}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>

        {/* More Projects Section */}
        {otherProjects.length > 0 && (
          <div className="border-border/60 mt-20 border-t pt-12 sm:mt-24 sm:pt-16">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-foreground text-lg font-bold sm:text-xl">
                  More Projects
                </h3>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
                  Explore other applications and platforms I&apos;ve built.
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <Link href="/projects">
                  <span>View All</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {otherProjects.slice(0, 2).map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group"
                >
                  <SpotlightCard className="flex h-full flex-col justify-between p-5 transition-all duration-300 group-hover:-translate-y-1 sm:p-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-accent text-xs font-semibold">
                          Case Study
                        </span>
                        <ArrowRight className="text-muted-foreground group-hover:text-accent size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                      <h4 className="text-foreground group-hover:text-accent mt-2 text-base font-bold transition-colors">
                        {other.title}
                      </h4>
                      <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed sm:text-sm">
                        {other.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {other.stack.slice(0, 3).map((t) => (
                        <Badge
                          key={t}
                          variant="muted"
                          className="bg-muted/70 text-[10px]"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
