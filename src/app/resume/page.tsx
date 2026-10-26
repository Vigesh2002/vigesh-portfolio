import { Suspense } from 'react';
import { profile } from '@/data/profile';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { FileDown } from '@/constants/icons';

export const metadata = {
  title: 'Resume',
  description: `${profile.name}'s resume and work history.`,
};

function ResumeContent() {
  return (
    <div className="border-border relative aspect-[4/5] w-full max-w-2xl overflow-hidden rounded-xl border sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
      <iframe
        src={profile.links.resume}
        title={`${profile.name}'s resume (PDF)`}
        className="h-full w-full"
      />
    </div>
  );
}

export default function ResumePage() {
  return (
    <main className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="xs:text-3xl text-2xl font-bold tracking-tight sm:text-4xl">
            Resume
          </h1>
          <Button asChild className="w-full sm:w-auto">
            <a
              href={profile.links.resume}
              download
              aria-label="Download resume (PDF)"
            >
              <FileDown className="size-4" aria-hidden="true" />
              Download PDF
            </a>
          </Button>
        </div>

        <Suspense
          fallback={
            <p className="text-muted-foreground mt-8">Loading resume…</p>
          }
        >
          <ResumeContent />
        </Suspense>
      </Container>
    </main>
  );
}
