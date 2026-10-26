import { profile } from '@/data/profile';
import { socialLinks } from '@/data/navigation';
import { SocialIcon } from '@/components/layout/social-icon';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <div className="mx-auto w-full max-w-[var(--layout-max)] px-[var(--spacing-page-x)] py-[var(--spacing-section-gap)]">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with Next.js, TailwindCSS and a lot of ❤️
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={link.label}
                  className="border-border text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-10 min-h-10 min-w-10 items-center justify-center rounded-lg border transition-colors"
                >
                  <SocialIcon name={link.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
