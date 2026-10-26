# Vigesh D — Portfolio

Personal portfolio site for **Vigesh D**, Frontend Engineer. Built with Next.js App Router, React 19, TypeScript, and TailwindCSS v4. Includes project case studies, a resume page, and a contact form backed by Resend.

**Live site:** https://vigeshd.dev

## Stack

| Layer              | Technologies                                                |
| ------------------ | ----------------------------------------------------------- |
| Framework          | Next.js 16 (App Router), React 19                           |
| Language           | TypeScript 5.9                                              |
| Styling            | TailwindCSS v4, CSS variables, CVA                          |
| Motion             | GSAP (+ ScrollTrigger, SplitText), Framer Motion, Lenis     |
| Forms / Validation | React Hook Form, Zod                                        |
| Email              | Resend                                                      |
| UI                 | lucide-react, next-themes, sonner                           |
| Testing            | Playwright (Chromium + Mobile Chrome)                       |
| Tooling            | ESLint (next/core-web-vitals), Prettier, Husky, lint-staged |

## Features

- Single-page portfolio: Hero, About, Skills, Experience, Projects, Education, Manifesto, Contact
- Dedicated routes: `/projects`, `/projects/[slug]`, `/resume`, `not-found`
- Contact form with Zod validation, honeypot spam field, and per-IP rate limiting (5 req/min)
- Dark / light system theme plus six accent color themes (Indigo, Emerald, Violet, Amber, Cyan, Forest)
- Motion layer: first-visit preloader, smooth scroll, scroll progress, custom cursor, split-text reveals — all gated by `prefers-reduced-motion`
- SEO: metadata, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`
- E2E tests covering navigation, home sections, and the contact form

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` (see below), then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and set:

| Variable               | Required     | Description                                                                       |
| ---------------------- | ------------ | --------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended  | Canonical site URL used for SEO, sitemap, and Playwright `baseURL`                |
| `RESEND_API_KEY`       | Contact form | Resend API key (`re_...`)                                                         |
| `RESEND_FROM`          | Contact form | Verified sender address                                                           |
| `CONTACT_TO_EMAIL`     | Contact form | Inbox that receives form submissions                                              |
| `CHROMIUM_PATH`        | Optional     | Local Chromium executable for Playwright when the managed download is unavailable |

The site builds and runs without Resend credentials; the contact form returns a server configuration error until they are set.

## Scripts

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start Next.js dev server   |
| `npm run build`        | Production build           |
| `npm run start`        | Serve the production build |
| `npm run lint`         | ESLint over the project    |
| `npm run lint:fix`     | ESLint with autofix        |
| `npm run format`       | Prettier write             |
| `npm run format:check` | Prettier check             |
| `npm run typecheck`    | TypeScript `tsc --noEmit`  |
| `npm test`             | Playwright E2E suite       |
| `npm run test:ui`      | Playwright UI mode         |

## Project Structure

```
src/
  app/                 # App Router pages, API route, SEO files
    api/contact/       # POST /api/contact (Zod + Resend + rate limit)
    projects/          # Project index and [slug] detail pages
    resume/            # Resume viewer + PDF download
  components/
    forms/             # Contact form
    icons/             # Inline brand icons (GitHub, LinkedIn)
    layout/            # Navbar, footer, theme/color controls, overlays
    motion/            # GSAP / Framer Motion wrappers
    providers/         # Theme, color theme, motion providers
    sections/          # Home page sections
    seo/               # JSON-LD
    ui/                # Button, badge, card, container, section heading
  config/              # Site metadata, color themes
  data/                # Profile, skills, experience, projects, education
  hooks/               # Scroll, motion, clipboard, active-section hooks
  lib/                 # utils, email, contact validation, motion constants
  tests/e2e/           # Playwright specs and helpers
scripts/               # Local motion / layout probe scripts
public/                # Static assets (project images, resume path, favicon)
```

Content lives in `src/data/*`. Update `profile.ts`, `projects.ts`, `experience.ts`, and related files to change what the site displays.

## Contact Form

`POST /api/contact` flow:

1. Requires `RESEND_API_KEY` and `CONTACT_TO_EMAIL`
2. Rate limits by client IP (5 requests per 60s window; in-memory — swap for Redis on multi-instance deploys)
3. Validates payload with Zod (`name`, `email`, `message`, honeypot `website`)
4. Sends email via Resend with the visitor as `replyTo`

## Testing

```bash
npm test
```

- Test dir: `src/tests/e2e`
- Projects: Desktop Chrome and Pixel 5 (Mobile Chrome)
- Dev server is started automatically via Playwright `webServer`
- Helpers in `helpers.ts` wait for the first-visit preloader before interacting

## Quality Gates

- **Husky** pre-commit runs `lint-staged`
- **lint-staged** formats JS/TS with Prettier and ESLint-fixes TS/TSX
- Run `npm run typecheck` and `npm run lint` before pushing larger changes

## Deploy

Standard Next.js deployment works on Vercel or any Node host:

```bash
npm run build
npm run start
```

Set the environment variables above in the host dashboard. Point `NEXT_PUBLIC_SITE_URL` at the production domain so metadata, sitemap, and robots stay correct.

## Author

**Vigesh D** — Frontend Engineer, Bengaluru

- GitHub: [github.com/vigeshd](https://github.com/vigeshd)
- LinkedIn: [linkedin.com/in/vigeshd](https://linkedin.com/in/vigeshd)
- Email: dhananjeyanvigesh@gmail.com
