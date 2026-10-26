'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  Star,
  LayoutGrid,
  ListFilter,
  ArrowUpFromLine,
  getTechStackIcon,
} from '@/constants/icons';
import { projects, allProjectStacks } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { Magnetic } from '@/components/motion/magnetic';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';

type FilterProps = {
  stacks: string[];
  active: string | null;
  onChange: (stack: string | null) => void;
};

function ProjectFilter({ stacks, active, onChange }: FilterProps) {
  return (
    <div className="flex max-w-full flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`min-h-10 cursor-pointer rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
          active === null
            ? 'border-accent bg-accent text-accent-foreground shadow-accent/25 scale-105 shadow-md'
            : 'border-border/70 bg-card/60 text-muted-foreground hover:border-accent/40 hover:bg-muted/80 hover:text-foreground'
        }`}
      >
        All Stacks
      </button>
      {stacks.map((stack) => (
        <button
          key={stack}
          type="button"
          onClick={() => onChange(stack)}
          className={`min-h-10 cursor-pointer rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
            active === stack
              ? 'border-accent bg-accent text-accent-foreground shadow-accent/25 scale-105 shadow-md'
              : 'border-border/70 bg-card/60 text-muted-foreground hover:border-accent/40 hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          {stack}
        </button>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  // Hover cross-fade needs a second frame. Until real second screenshots exist,
  // this degrades to a single image and the cross-fade simply never shows.
  const [primary, ...rest] = project.images?.length
    ? project.images
    : [project.image];
  const hoverImage = rest[0];

  return (
    <SpotlightCard
      className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image Container with Gradient Overlay and Zoom */}
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        <Image
          src={primary}
          alt={project.title}
          fill
          sizes="(min-width: 640px) 500px, 100vw"
          className="scale-105 object-cover object-top transition-all duration-700 ease-out group-hover:scale-110"
        />
        {/* Secondary frame, revealed on hover. Only rendered when it differs. */}
        {hoverImage ? (
          <Image
            src={hoverImage}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 640px) 500px, 100vw"
            className="object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        ) : null}
        <div className="from-background/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />

        {/* Featured Tag */}
        {project.featured && (
          <div className="border-accent/30 bg-background/85 text-accent absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold shadow-xs backdrop-blur-md">
            <Star className="text-accent size-3 animate-pulse" />
            <span>Featured Case Study</span>
          </div>
        )}

        {/* Live Site Quick Link Badge */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open live site for ${project.title}`}
            className="border-accent/40 bg-background/90 text-accent hover:border-accent hover:bg-accent hover:text-accent-foreground absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-md transition-all duration-200"
          >
            <span>Live Site</span>
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="text-foreground group-hover:text-accent text-lg font-bold tracking-tight transition-colors duration-200 sm:text-xl">
          {project.title}
        </h3>

        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {project.summary}
        </p>

        {/* Stack Tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => {
            const TechIcon = getTechStackIcon(tech);
            return (
              <Badge
                key={tech}
                variant="muted"
                className="bg-muted/70 hover:border-accent/40 hover:text-accent inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium transition-all duration-200 hover:scale-105"
              >
                {TechIcon && <TechIcon className="size-3 shrink-0 self-center" />}
                <span>{tech}</span>
              </Badge>
            );
          })}
          {project.stack.length > 4 && (
            <Badge variant="muted" className="bg-muted/70 text-[11px]">
              +{project.stack.length - 4}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-border/50 mt-6 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
          <Button
            asChild
            variant="link"
            size="sm"
            className="text-accent group/btn p-0 font-semibold"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5"
            >
              <span>Read Case Study</span>
              <ArrowRight
                className="size-3.5 transition-transform group-hover/btn:translate-x-1.5"
                aria-hidden="true"
              />
            </Link>
          </Button>

          {project.liveUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-accent/40 bg-accent/10 text-accent hover:border-accent hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-xs transition-all hover:shadow-md"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live platform for ${project.title}`}
              >
                <span>Live Platform</span>
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

function ProjectEditorialList({ items }: { items: typeof projects }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="glass-card text-muted-foreground rounded-2xl p-6 text-center sm:p-12">
        <p className="text-base">No featured projects to display.</p>
      </div>
    );
  }

  const activeProject = items.find((p) => p.slug === hoveredSlug) ?? items[0];

  return (
    <div className="relative grid items-start gap-8 lg:grid-cols-12">
      {/* Editorial Row List (Left) */}
      <div className="space-y-3 lg:col-span-7">
        {items.map((project, idx) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            onMouseEnter={() => setHoveredSlug(project.slug)}
            onFocus={() => setHoveredSlug(project.slug)}
            className="group border-border/70 bg-card/50 hover:border-accent/60 hover:bg-accent/5 flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:translate-x-1 sm:flex-row sm:items-center"
          >
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-accent font-mono text-xs font-semibold">
                  0{idx + 1}
                </span>
                <h3 className="text-foreground group-hover:text-accent truncate text-lg font-bold transition-colors">
                  {project.title}
                </h3>
              </div>
              <p className="text-muted-foreground line-clamp-2 text-xs">
                {project.summary}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="text-accent text-xs font-semibold sm:hidden">
                View Project
              </span>
              <div className="border-border bg-card text-muted-foreground group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground flex size-9 items-center justify-center rounded-full border transition-all group-hover:rotate-45">
                <ArrowUpFromLine className="size-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Dynamic Hover Preview Display (Right) */}
      <div className="sticky top-24 hidden lg:col-span-5 lg:block">
        <SpotlightCard className="border-border/80 overflow-hidden rounded-2xl border p-2 shadow-2xl">
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              className="object-cover transition-all duration-500"
            />
            <div className="from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <h4 className="text-foreground text-base font-bold">
              {activeProject.title}
            </h4>
            <div className="mt-2 flex flex-wrap gap-1">
              {activeProject.stack.slice(0, 4).map((tech) => {
                const TechIcon = getTechStackIcon(tech);
                return (
                  <Badge key={tech} variant="muted" className="inline-flex items-center gap-1 text-[10px]">
                    {TechIcon && <TechIcon className="size-2.5 shrink-0" />}
                    <span>{tech}</span>
                  </Badge>
                );
              })}
            </div>

            {activeProject.liveUrl && (
              <div className="border-border/50 mt-4 border-t pt-3">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-accent/40 bg-accent/10 text-accent hover:border-accent hover:bg-accent hover:text-accent-foreground w-full gap-2 text-xs font-semibold shadow-xs"
                >
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

export function Projects({
  initialFilter: _initialFilter,
}: {
  initialFilter?: string | null;
} = {}) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="border-border/70 relative border-y py-[var(--spacing-section-y)]"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured Projects"
            description="Products and platforms I've architected end-to-end — with modern frontend tooling, real-time flows, and production-grade testing."
            align="left"
            className="min-w-0 flex-1"
          />

          {/* View Mode Switcher */}
          <div
            role="group"
            aria-label="Project view mode"
            className="border-border/70 bg-card/60 flex shrink-0 items-center gap-1 self-start rounded-xl border p-1 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              aria-pressed={viewMode === 'grid'}
              className={`flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-accent text-accent-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>Grid</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="Editorial List View"
              aria-pressed={viewMode === 'list'}
              className={`flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-accent text-accent-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ListFilter className="size-3.5" />
              <span>Interactive</span>
            </button>
          </div>
        </div>

        {/* Keyed on viewMode so grid ↔ list remount cleanly (no stuck opacity-0). */}
        <div key={viewMode} className="mt-[var(--spacing-section-gap)]">
          {viewMode === 'grid' ? (
            <RevealGroup staggerChildren={0.12}>
              <div className="grid gap-8 md:grid-cols-2">
                {featured.map((project) => (
                  <RevealItem key={project.slug} className="h-full">
                    <ProjectCard project={project} />
                  </RevealItem>
                ))}
              </div>
            </RevealGroup>
          ) : (
            <RevealItem>
              <ProjectEditorialList items={featured} />
            </RevealItem>
          )}
        </div>

        <div className="mt-[var(--spacing-section-gap)] flex justify-center">
          <Magnetic className="w-full sm:w-auto">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass-card hover:shadow-accent/20 w-full justify-center gap-2 shadow-lg sm:w-auto sm:mx-auto"
            >
              <Link
                href="/projects"
                className="inline-flex w-full items-center justify-center gap-2 sm:w-auto sm:mx-auto"
              >
                View all project archives
                <ExternalLink className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}

export { ProjectFilter, ProjectCard, allProjectStacks };
