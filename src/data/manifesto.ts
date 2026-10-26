/**
 * Manifesto copy and the discipline line.
 *
 * Kept as data so the section shell stays a server component and the copy can
 * be edited without touching markup.
 */
export const manifesto = {
  eyebrow: 'How I Work',
  title: 'Principles',
  statements: [
    'A frontend should get faster as the product grows, not slower.',
    'Design systems pay for themselves the first time two people need the same button.',
    'Real-time features are a correctness problem before they are a rendering problem.',
    'Tests are the cheapest documentation that cannot go stale.',
  ],
  disciplines: [
    'React',
    'Next.js',
    'Design Systems',
    'Real-time',
    'Architecture',
    'Accessibility',
    'Testing',
  ],
} as const;

export const closingCta = {
  headline: "Let's build something",
  supporting:
    'Open to full-time frontend roles, and happy to talk through a specific problem first.',
} as const;
