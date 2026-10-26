export const site = {
  name: 'Vigesh D',
  title: 'Vigesh D — Frontend Engineer',
  description:
    'Frontend Engineer with 2+ years of experience building React products, scalable multi-tenant SaaS platforms, real-time communication tools, and automated E2E test suites.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vigeshd.dev',
  ogImage: '/og-default.png',
  locale: 'en_IN',
} as const;

export const stats = [
  { label: 'Years of experience', value: '2+' },
  { label: 'Routes architected', value: '50+' },
  { label: 'Components built', value: '100+' },
  { label: 'E2E tests', value: 'Playwright' },
] as const;

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;
