'use client';

import { Menu, Code } from '@/constants/icons';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { navLinks } from '@/config/site';
import { useActiveSection } from '@/hooks/use-active-section';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { profile } from '@/data/profile';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { ColorPicker } from '@/components/layout/color-picker';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const hasScrolled = useScrollPosition();
  const activeSection = useActiveSection(sectionIds);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        hasScrolled || menuOpen
          ? 'border-border/80 bg-background/80 border-b shadow-xs backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group xs:gap-2 xs:text-sm flex min-w-0 items-center gap-1.5 text-xs font-bold tracking-tight sm:text-sm"
            onClick={closeMenu}
          >
            <span className="border-accent/30 bg-accent/10 text-accent flex size-7 shrink-0 items-center justify-center rounded-lg border transition-transform group-hover:scale-105">
              <Code className="size-3.5" />
            </span>
            <span className="truncate">{profile.name}</span>
            <span className="text-muted-foreground/60 xs:inline hidden">/</span>
            <span className="text-muted-foreground xs:inline hidden font-mono text-xs font-normal">
              engineer
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="border-border/60 bg-card/60 flex items-center gap-1 rounded-full border p-1 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
                        isActive
                          ? 'bg-accent text-accent-foreground shadow-accent/30 shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/70',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ColorPicker />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="border-border text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-10 min-h-10 min-w-10 items-center justify-center rounded-lg border transition-colors lg:hidden"
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>

      <div id="mobile-menu">
        <MobileMenu
          open={menuOpen}
          onClose={closeMenu}
          activeSection={activeSection}
        />
      </div>
    </header>
  );
}
