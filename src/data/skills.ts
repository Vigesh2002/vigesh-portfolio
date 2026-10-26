import type { Skill } from '@/types';

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frontend',
    items: [
      'React 19',
      'Next.js',
      'Vite',
      'Redux',
      'Zustand',
      'TanStack Query',
      'Tailwind CSS',
      'shadcn/ui',
      'Framer Motion',
    ],
  },
  {
    category: 'Real-time and canvas',
    items: ['Socket.IO', 'WebSockets', 'React Flow', 'Dagre'],
  },
  {
    category: 'Forms and data',
    items: [
      'React Hook Form',
      'Zod',
      'PapaParse',
      'libphonenumber-js',
      'Chart.js',
      'Recharts',
    ],
  },
  {
    category: 'Auth',
    items: [
      'JWT',
      'OAuth',
      'OTP verification',
      'Axios interceptors',
      'role-based access control',
    ],
  },
  {
    category: 'Testing',
    items: ['Playwright', 'Vitest', 'React Testing Library'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Antigravity'],
  },
  {
    category: 'AI tools',
    items: ['ChatGPT', 'Claude', 'DeepSeek', 'Gemini', 'Grok'],
  },
];
