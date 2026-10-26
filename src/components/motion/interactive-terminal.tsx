'use client';

import React, { useState } from 'react';
import {
  Terminal,
  FileCode,
  Check,
  Copy,
  Layers,
  ShieldCheck,
  Play,
  Route,
  ReactIcon,
} from '@/constants/icons';
import { SpotlightCard } from '@/components/motion/spotlight-card';

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<'engineer' | 'stack' | 'test'>(
    'engineer',
  );
  const [copied, setCopied] = useState(false);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testOutput, setTestOutput] = useState<string[]>([
    '✓ 50+ routes verified (Turbopack)',
    '✓ 100+ components type-safe (TypeScript 5.9)',
    '✓ 100% Playwright E2E suites passing',
  ]);

  const copyCode = () => {
    const code =
      activeTab === 'engineer'
        ? `const engineer = {
  name: "Vigesh D",
  role: "Software Developer, Frontend",
  experience: "2+ Years building React products",
  specialization: "Multi-tenant SaaS & Real-Time Apps",
  status: "Available for new roles 🚀"
};`
        : `const stack = ["React 19", "TypeScript", "Next.js", "Zustand", "TanStack Query", "Socket.IO", "React Flow", "Playwright"];`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runTests = () => {
    setIsRunningTest(true);
    setTestOutput(['Running Playwright E2E suites...']);

    setTimeout(() => {
      setTestOutput([
        '✓ tests/auth.spec.ts (Multi-tenant JWT session & RBAC)',
        '✓ tests/flow-builder.spec.ts (React Flow & Dagre loops/orphans check)',
        '✓ tests/team-inbox.spec.ts (Socket.IO events & 24h WhatsApp window)',
        '✓ tests/crm-segments.spec.ts (Nested AND/OR rules & CSV mapping)',
        '✨ All 18 tests passed in 1.42s!',
      ]);
      setIsRunningTest(false);
    }, 900);
  };

  return (
    <SpotlightCard className="border-border/80 relative w-full max-w-full overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl">
      {/* Decorative ambient corner glow */}
      <div className="bg-accent/20 pointer-events-none absolute -top-12 -right-12 size-48 rounded-full blur-3xl" />

      {/* Terminal Window Header with Tabs */}
      <div className="border-border/60 bg-muted/30 flex items-center justify-between border-b px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="no-scrollbar flex max-w-[calc(100%-48px)] items-center gap-2 overflow-x-auto">
          {/* Traffic light buttons */}
          <div className="mr-2 hidden items-center gap-1.5 sm:flex">
            <span className="size-2.5 rounded-full bg-red-500/80 shadow-xs" />
            <span className="size-2.5 rounded-full bg-amber-500/80 shadow-xs" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 shadow-xs" />
          </div>

          {/* Interactive Tabs */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('engineer')}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] whitespace-nowrap transition-colors sm:text-xs ${
                activeTab === 'engineer'
                  ? 'bg-card text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileCode className="text-accent size-3" />
              <span>profile.ts</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stack')}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] whitespace-nowrap transition-colors sm:text-xs ${
                activeTab === 'stack'
                  ? 'bg-card text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Layers className="text-accent size-3" />
              <span>stack.ts</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('test')}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] whitespace-nowrap transition-colors sm:text-xs ${
                activeTab === 'test'
                  ? 'bg-card text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Terminal className="size-3 text-emerald-400" />
              <span>test.sh</span>
            </button>
          </div>
        </div>

        {/* Copy or Action button */}
        {activeTab !== 'test' ? (
          <button
            type="button"
            onClick={copyCode}
            aria-label="Copy snippet"
            className="border-border/60 bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all sm:size-7"
          >
            {copied ? (
              <Check className="text-accent size-3" />
            ) : (
              <Copy className="size-3" />
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={runTests}
            disabled={isRunningTest}
            className="border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground flex min-h-8 shrink-0 items-center gap-1 rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold transition-all disabled:opacity-50 sm:min-h-0 sm:px-2 sm:py-0.5"
          >
            <Play
              className={`size-2.5 ${isRunningTest ? 'animate-spin' : ''}`}
            />
            <span>{isRunningTest ? 'Running...' : 'Run'}</span>
          </button>
        )}
      </div>

      {/* Terminal Code Display */}
      <div className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-xs">
        {activeTab === 'engineer' && (
          <div className="animate-in fade-in-0 min-w-[240px] space-y-1.5 duration-200">
            <div className="text-muted-foreground">
              <span className="text-accent">export const</span>{' '}
              <span className="text-foreground font-semibold">
                frontendEngineer
              </span>{' '}
              = {'{'}
            </div>
            <div className="text-muted-foreground pl-4">
              name:{' '}
              <span className="text-emerald-400">&quot;Vigesh D&quot;</span>,
            </div>
            <div className="text-muted-foreground pl-4">
              role:{' '}
              <span className="text-foreground">
                &quot;Software Developer, Frontend&quot;
              </span>
              ,
            </div>
            <div className="text-muted-foreground pl-4">
              experience:{' '}
              <span className="text-foreground">
                &quot;2+ years building React products&quot;
              </span>
              ,
            </div>
            <div className="text-muted-foreground pl-4">
              specialty:{' '}
              <span className="text-accent">
                &quot;Multi-tenant SaaS & Real-Time&quot;
              </span>
              ,
            </div>
            <div className="text-muted-foreground pl-4">
              designSystem:{' '}
              <span className="text-foreground">
                &quot;100+ theme-ready components&quot;
              </span>
              ,
            </div>
            <div className="text-muted-foreground pl-4">
              status:{' '}
              <span className="font-bold text-emerald-400">
                &quot;Ready to Ship 🚀&quot;
              </span>
            </div>
            <div className="text-muted-foreground">{'};'}</div>
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="animate-in fade-in-0 min-w-[240px] space-y-1.5 duration-200">
            <div className="text-muted-foreground">
              <span className="text-accent">interface</span>{' '}
              <span className="text-foreground font-semibold">
                ProductionStack
              </span>{' '}
              {'{'}
            </div>
            <div className="text-muted-foreground pl-4">
              framework:{' '}
              <span className="text-sky-400">
                &quot;React 19 + TypeScript + Next.js&quot;
              </span>
              ,
            </div>
            <div className="text-muted-foreground pl-4">
              stateAndData:{' '}
              <span className="text-teal-400">
                &quot;Zustand + TanStack Query&quot;
              </span>
              ,
            </div>
            <div className="text-muted-foreground pl-4">
              realtimeAndFlow:{' '}
              <span className="text-emerald-400">
                &quot;Socket.IO + React Flow + Dagre&quot;
              </span>
              ,
            </div>
            <div className="text-muted-foreground pl-4">
              testing:{' '}
              <span className="text-rose-400">
                &quot;Playwright Automated E2E + Vitest&quot;
              </span>
            </div>
            <div className="text-muted-foreground">{'}'}</div>
          </div>
        )}

        {activeTab === 'test' && (
          <div className="animate-in fade-in-0 min-w-[240px] space-y-2 duration-200">
            <div className="text-muted-foreground flex items-center gap-2">
              <span className="text-accent">$</span>
              <span>npx playwright test</span>
            </div>
            <div className="space-y-1 pt-1">
              {testOutput.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith('✓') || line.startsWith('✨')
                      ? 'text-emerald-400'
                      : 'text-muted-foreground'
                  }
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Highlights Interactive Footer Row */}
      <div className="border-border/60 bg-card/40 grid grid-cols-2 gap-2 border-t p-3 sm:grid-cols-4">
        <div className="border-border/40 bg-muted/40 flex items-center gap-1.5 rounded-lg border px-2 py-2 text-[11px] sm:py-1.5">
          <Layers className="text-accent size-3.5 shrink-0" />
          <span className="text-foreground truncate font-semibold">
            100+ Comps
          </span>
        </div>
        <div className="border-border/40 bg-muted/40 flex items-center gap-1.5 rounded-lg border px-2 py-2 text-[11px] sm:py-1.5">
          <Route className="text-accent size-3.5 shrink-0" />
          <span className="text-foreground truncate font-semibold">
            50+ Routes
          </span>
        </div>
        <div className="border-border/40 bg-muted/40 flex items-center gap-1.5 rounded-lg border px-2 py-2 text-[11px] sm:py-1.5">
          <ShieldCheck className="size-3.5 shrink-0 text-emerald-400" />
          <span className="text-foreground truncate font-semibold">
            E2E Tested
          </span>
        </div>
        <div className="border-border/40 bg-muted/40 flex items-center gap-1.5 rounded-lg border px-2 py-2 text-[11px] sm:py-1.5">
          <ReactIcon className="text-sky-400 size-3.5 shrink-0" />
          <span className="text-foreground truncate font-semibold">
            React 19
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
