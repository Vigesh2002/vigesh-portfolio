# Claude / Agent Instructions — Vigesh Portfolio

Follow this file when working on **Vigesh-Portfolio**.  
Goal: make correct changes, **do not break existing features**, **do not repeat past bugs**, and always finish with the required verification report.

---

## 1. Project snapshot

| Item       | Value                                                   |
| ---------- | ------------------------------------------------------- |
| Project    | Personal portfolio of Vigesh D                          |
| Framework  | Next.js 16 (App Router) + React 19                      |
| Language   | TypeScript (strict)                                     |
| Styling    | TailwindCSS v4 + CSS variables                          |
| Path alias | `@/*` → `./src/*`                                       |
| Forms      | React Hook Form + Zod                                   |
| Email      | Resend (`/api/contact`)                                 |
| Motion     | GSAP (+ ScrollTrigger, SplitText), Framer Motion, Lenis |
| Tests      | Playwright E2E (`src/tests/e2e`)                        |
| Lint       | ESLint (next/core-web-vitals + typescript)              |
| Format     | Prettier (single quotes, trailing commas, width 80)     |

**Live site config:** `https://vigeshd.dev` (override with `NEXT_PUBLIC_SITE_URL`)

---

## 2. How to work on this project (mandatory workflow)

### 2.1 Before you change anything

1. Read the task carefully. Identify which **files** and **features** are involved.
2. Search the codebase for related symbols (`grep` / `glob`) before editing.
3. Understand the surrounding pattern (providers, hooks, data modules, motion wrappers).
4. Never guess APIs — read the file you are about to change.
5. Keep changes **minimal**. Do not refactor unrelated code “while you are there”.

### 2.2 While implementing

1. Match existing code style:
   - Prettier: single quotes, trailing commas, semi, print width 80
   - Tailwind class order handled by `prettier-plugin-tailwindcss`
   - Components: named exports; `"use client"` only when client-only
2. Use path aliases: `@/components/...`, `@/lib/...`, `@/hooks/...`, `@/data/...`, `@/config/...`
3. Put content in `src/data/*` (profile, projects, skills, experience, education, navigation).
4. Put site config in `src/config/site.ts` and `src/config/color-themes.ts`.
5. Do **not** hardcode secrets. Env vars only via `process.env` / `.env.local`.
6. Do **not** commit `.env`, `.env.local`, or real API keys.
7. Prefer editing existing files over creating new ones.
8. Do **not** add comments unless they explain non-obvious constraints (this repo already documents hard-won behavior).

### 2.3 After implementing

Run checks **in this order** (stop and fix if any fail):

```bash
npm run typecheck
npm run lint
npm test
```

If the change touches UI, motion, layout, or routes, also:

```bash
npm run build
```

If Playwright cannot run (no browsers), say so honestly in the final report — do **not** claim tests passed.

Optional local probes (when debugging motion/layout):

- `scripts/probe-*.mjs`, `scripts/verify-motion.mjs`

---

## 3. Project structure (where things live)

```
src/
  app/                 # App Router
    page.tsx           # Home (sections + Preloader)
    layout.tsx         # Theme, color theme, motion providers, navbar, footer
    api/contact/       # POST contact API
    projects/          # /projects and /projects/[slug]
    resume/            # /resume
    robots.ts, sitemap.ts
  components/
    forms/             # ContactForm
    layout/            # Navbar, Footer, ThemeToggle, ColorPicker, overlays
    motion/            # Preloader, Reveal, SplitReveal, SmoothScroll, etc.
    providers/         # ThemeProvider, ColorThemeProvider, MotionProvider
    sections/          # Hero, About, Skills, Experience, Projects, ...
    ui/                # Button, Badge, Card, Container, SectionHeading
    seo/               # JSON-LD
  config/              # site.ts, color-themes.ts
  data/                # profile, projects, skills, experience, education
  hooks/               # use-reduced-motion, use-first-visit, use-scroll-position, ...
  lib/                 # utils, email, validations/contact, motion/gsap, motion/constants
  tests/e2e/           # Playwright specs + helpers.ts
```

**Home page sections order** (`src/app/page.tsx`):  
Preloader → Hero → About → Skills → Experience → Projects → Education → Manifesto → Contact

Do not reorder or remove sections without an explicit task.

---

## 4. Rules to avoid breaking other features

### 4.1 Providers (do not break the chain)

Root layout composes:

`ThemeProvider` → `ColorThemeProvider` → `MotionProvider` → layout chrome

- Keep `"use client"` on providers that use hooks.
- Keep `suppressHydrationWarning` on `<html>` (theme + color theme scripts).
- Do not remove the inline color-theme bootstrap script in `layout.tsx` (prevents FOUC).
- Do not mount a second `ThemeProvider` / `ColorThemeProvider` / Lenis instance.

### 4.2 Motion system (high risk — read carefully)

| Rule                                                                                      | Why                                                          |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Import GSAP only via `@/lib/motion/gsap`                                                  | Avoids duplicate plugin registration / tree-shaking loss     |
| Call `registerGsap()` inside effects / `useGSAP`, not during SSR render                   | Server has no `window`                                       |
| Use local `@/hooks/use-reduced-motion`, **not** framer-motion’s hook for render branching | framer’s hook returns `false` on server → hydration mismatch |
| Keep motion values in `@/lib/motion/constants`                                            | No magic numbers                                             |
| Respect `prefers-reduced-motion` on every animation                                       | Accessibility + test stability                               |
| Never leave `document.body.style.overflow = "hidden"` without a restore path              | Page becomes unusable                                        |
| Preloader is **home + first visit only**                                                  | Must not block repeat visits or other routes                 |
| sessionStorage keys: `portfolio:preloader-played`, `portfolio-color-theme`                | Do not rename without updating consumers + tests             |

**Past bug pattern (do not reintroduce):** branching on a reduced-motion hook that returns `false` on the server produced SSR/client markup mismatch (`opacity: 0` wrappers server-side, removed client-side).  
**Correct pattern:** use `useSyncExternalStore` with a server snapshot of `false` (see `src/hooks/use-reduced-motion.ts`), then branch in effects / `useGSAP` / `useCallback`.

**Past bug pattern (do not reintroduce):** deriving preloader visibility from re-reading `sessionStorage` in render. Writes do not notify subscribers → curtain never unmounts.  
**Correct pattern:** local state (`dismissed`) + `markPreloaderPlayed()` on finish (see `src/components/motion/preloader.tsx`).

### 4.3 Contact form + API

Client (`src/components/forms/contact-form.tsx`):

- Zod schema: `src/lib/validations/contact.ts`
- Fields: `name`, `email`, `message`, honeypot `website`
- Honeypot must stay invisible and max-length 0
- Show server errors via `alert` / accessible messaging (E2E expects alerts)

Server (`src/app/api/contact/route.ts`):

- Requires `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
- Rate limit: **5 requests / 60s per IP** (in-memory Map)
- Validates with Zod before send
- Sends via Resend with visitor email as `replyTo`

Do not:

- Remove rate limiting without replacing it
- Log secrets or full env in responses
- Return stack traces to the client
- Break the success JSON shape `{ success, message }` (tests depend on it)

### 4.4 Theme / color themes

- Light/dark: `next-themes` (`ThemeProvider`, `ThemeToggle`)
- Accent themes: `ColorThemeProvider` + `src/config/color-themes.ts`
- Storage key: `portfolio-color-theme`
- CSS variables must stay valid for both light and dark hex values

### 4.5 Accessibility & SEO

- Keep focus traps in mobile menu working
- Keep `aria-label` on interactive icon buttons
- Keep reduced-motion support
- Keep metadata, `robots.ts`, `sitemap.ts`, and project routes in sync when adding pages
- If you add a public route, add it to `sitemap.ts`

### 4.6 Testing expectations

Playwright:

- `testDir`: `src/tests/e2e`
- Projects: Chromium + Mobile Chrome (Pixel 5)
- `baseURL`: `NEXT_PUBLIC_SITE_URL` or `http://localhost:3000`
- Dev server auto-starts via `webServer`

Helpers (`src/tests/e2e/helpers.ts`):

- `waitForPreloader(page)` — waits for `[aria-label="Loading site"]` to detach
- `gotoHome(page)` — `goto` + preloader wait

When you change UI that tests touch:

- Update the matching spec if labels/roles changed
- Prefer resilient selectors (roles/labels), not CSS classes
- Do not weaken assertions just to make tests pass

### 4.7 Git / tooling

- Husky pre-commit runs `lint-staged`
- lint-staged: Prettier on JS/TS; ESLint fix on TS/TSX
- Do not disable hooks, lint rules, or typecheck to “make it pass”
- Do not commit `node_modules`, `.next`, `test-results`, `playwright-report`, `*.tsbuildinfo`, `.env*`
- Windows note: never create a literal `nul` file; `.gitignore` already covers it

---

## 5. Known pitfalls checklist (scan before you finish)

- [ ] No hydration mismatch from theme / reduced-motion / first-visit hooks
- [ ] No direct `gsap` / `ScrollTrigger` / `SplitText` imports outside `@/lib/motion/gsap`
- [ ] Scroll lock always restored (preloader, mobile menu, any modal)
- [ ] Contact honeypot + rate limit + Zod still intact
- [ ] Env vars not hardcoded; `.env.local` not committed
- [ ] Path alias `@/*` used (no fragile relative `../../../` chains)
- [ ] Client components marked `"use client"`; server components stay server
- [ ] Data edits only in `src/data/*` and config only in `src/config/*`
- [ ] New routes added to sitemap/robots if public
- [ ] Playwright helpers still match DOM (`aria-label="Loading site"`, form labels)
- [ ] `npm run typecheck` and `npm run lint` clean
- [ ] `npm test` / `npm run build` pass or failures honestly reported

---

## 6. Definition of done

Your task is done only when **all** of the following are true:

1. The requested change is implemented and scoped to the task.
2. Related features still work (navigation, sections, theme, motion, contact, projects, resume).
3. You ran `npm run typecheck` and `npm run lint` successfully.
4. You ran tests and/or build when the change required them, **or** you clearly state they could not run and why.
5. You did **not** leave debug code, TODO spam, console.logs, or unused files.
6. You prepare the **final verification report** in the format below.

---

## 7. Final message format (REQUIRED)

When the work is complete, end your response with **exactly this headline**, then the structured report:

```text
VIGESH work done, checked and verify by the agent without any error
```

Then provide these sections **clearly labeled**:

### Error Found

- What was broken, missing, or incorrect (or: `None — no pre-existing error; implemented as requested.`)

### How It Was Handled

- What approach was taken to resolve or prevent the issue.

### Solution Provided

- The actual fix / feature / change, described in plain language.

### Files Updated

- List every file created or modified, with a one-line reason each.

### Verification

- Commands run and results, for example:
  - `npm run typecheck` — pass
  - `npm run lint` — pass
  - `npm test` — pass / skipped + reason
  - `npm run build` — pass / skipped + reason
- Note any residual risk or follow-up needed.

**Rules for the final report:**

- Be honest. Never claim a check passed if it did not run or failed.
- If something is blocked (missing API key, no browsers, no network), say so explicitly.
- Mention impact on other features: `No impact on other features.` or list what was checked.
- Keep the headline **exactly** as required — do not paraphrase it.

---

## 8. Quick command reference

```bash
npm install
cp .env.example .env.local

npm run dev          # http://localhost:3000
npm run build
npm run start
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
npm test
npm run test:ui
```

Env vars (`.env.local`):

- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `CONTACT_TO_EMAIL`
- `CHROMIUM_PATH` (optional, Playwright)

---

## 9. Communication style with the user

- Be direct. No filler.
- After changes, briefly state **what** changed, then the required final report.
- If the task is ambiguous, ask before large refactors.
- Do not invent features, URLs, or metrics that are not in the codebase.
