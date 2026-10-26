import Link from 'next/link';
import { Home } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export const metadata = {
  title: 'Not found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem-5rem)] items-center">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-accent text-8xl font-extrabold">404</h1>
          <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>
          <p className="text-muted-foreground mt-3">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/">
                <Home className="size-4" aria-hidden="true" />
                Back to home
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
