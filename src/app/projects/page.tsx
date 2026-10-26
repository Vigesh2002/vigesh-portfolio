'use client';

import { Suspense, useState } from 'react';
import { projects, allProjectStacks } from '@/data/projects';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectFilter, ProjectCard } from '@/components/sections/projects';

type FilterValue = string | null;

function ProjectGridClient({ filter }: { filter: FilterValue }) {
  const filtered =
    filter === null
      ? projects
      : projects.filter((p) => p.stack.includes(filter));

  if (filtered.length === 0) {
    return (
      <div className="glass-card text-muted-foreground rounded-2xl p-6 text-center sm:p-12">
        <p className="text-base">
          No projects found matching that technology filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
      {filtered.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterValue>(null);

  return (
    <main className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Portfolio Archive"
          title="All Projects & Architectures"
          description="A comprehensive archive of applications, design systems, and frontend infrastructures."
          align="left"
        />

        <div className="mt-8">
          <ProjectFilter
            stacks={allProjectStacks}
            active={filter}
            onChange={setFilter}
          />
        </div>

        <Suspense
          fallback={
            <p className="text-muted-foreground mt-8">Loading projects…</p>
          }
        >
          <ProjectGridClient filter={filter} />
        </Suspense>
      </Container>
    </main>
  );
}
