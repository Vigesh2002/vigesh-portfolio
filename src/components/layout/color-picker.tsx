'use client';

import { CheckCheck, Palette } from '@/constants/icons';
import { useEffect, useRef, useState } from 'react';
import { useColorTheme } from '@/components/providers/color-theme-provider';
import { cn } from '@/lib/utils';

export function ColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { colorTheme, setColorTheme, themes } = useColorTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Close on Escape key
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentTheme = themes.find((t) => t.id === colorTheme) ?? themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Change accent color (Current: ${currentTheme.name})`}
        className={cn(
          'group border-border text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring relative inline-flex size-10 min-h-10 min-w-10 items-center justify-center rounded-lg border transition-all focus-visible:ring-2 focus-visible:outline-none',
          isOpen && 'bg-muted text-foreground ring-ring ring-2',
        )}
      >
        <Palette
          className="size-4 transition-transform group-hover:rotate-12"
          aria-hidden="true"
        />

        {/* Active color dot indicator */}
        <span
          className="ring-background absolute right-1.5 bottom-1.5 size-2 rounded-full shadow-xs ring-1 transition-colors"
          style={{ backgroundColor: currentTheme.previewColor }}
          aria-hidden="true"
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="Color Systems"
          className="border-border bg-card/95 animate-in fade-in-0 zoom-in-95 absolute top-full right-0 z-50 mt-2 w-72 max-w-[calc(100vw-1.75rem)] origin-top-right rounded-xl border p-2 shadow-2xl backdrop-blur-md duration-150"
        >
          {/* Header */}
          <div className="border-border/80 border-b px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div
                className="size-3 rounded-full transition-colors"
                style={{ backgroundColor: currentTheme.previewColor }}
              />
              <span className="text-foreground text-xs font-semibold tracking-wider uppercase">
                Theme Color System
              </span>
            </div>
            <p className="text-muted-foreground mt-0.5 text-[11px]">
              Curated palettes inspired by modern tech products
            </p>
          </div>

          {/* Theme Options */}
          <div className="mt-1 space-y-1 py-1">
            {themes.map((theme) => {
              const isSelected = theme.id === colorTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => {
                    setColorTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    isSelected
                      ? 'bg-accent/15 text-foreground font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Swatch */}
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full shadow-xs ring-1 ring-black/10 transition-transform group-hover:scale-110 dark:ring-white/20',
                        isSelected && 'ring-foreground/20 ring-2',
                      )}
                      style={{ backgroundColor: theme.previewColor }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5 leading-tight">
                        <span className="text-foreground font-semibold">
                          {theme.name}
                        </span>
                      </div>
                      <span className="text-muted-foreground block text-[11px]">
                        {theme.brand}
                      </span>
                    </div>
                  </div>

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <CheckCheck
                      className="text-accent size-4 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
