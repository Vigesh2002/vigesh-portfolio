import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'hustlebot',
    title: 'HustleBot – Marketing Automation Platform',
    summary:
      'Multi-tenant marketing platform for WhatsApp and email with visual flow builders, live Socket.IO team inbox, and rule-based CRM.',
    stack: [
      'React 19',
      'TypeScript',
      'React Flow',
      'Dagre',
      'Socket.IO',
      'Tailwind CSS',
      'Chart.js',
      'Recharts',
      'Playwright',
    ],
    highlights: [
      'Engineered the visual flow builder with React Flow and Dagre featuring auto-layout, conditional branches, and graph checks that catch loops and orphaned nodes.',
      "Developed the real-time team inbox on Socket.IO following WhatsApp's 24-hour window, with agent transfers, internal notes, and approved template fallbacks.",
      'Built rule-based CRM segment builder with nested AND/OR groups, custom attributes, and CSV import with column mapping and duplicate detection.',
      "Implemented audience retargeting for contacts who read but didn't click or whose messages bounced, updating audience size in real time with wallet balance validation.",
      'Authored comprehensive Playwright end-to-end test suites covering authentication, navigation, and core business workflows.',
    ],
    image: '/images/projects/hustlebot-dashboard.webp',
    liveUrl: 'https://hustlebot.apprikart.com/',
    featured: true,
  },
  {
    slug: 'vox-neural-voice-assistant',
    title: 'Vox – Real-Time Neural Voice Assistant',
    summary:
      'Low-latency voice assistant with wake word detection, pluggable neural speech pipeline, and token-by-token LLM streaming over Socket.IO.',
    stack: [
      'React',
      'Redux Toolkit',
      'Socket.IO',
      'Node.js',
      'Web Audio API',
      'Web Speech API',
      'NVIDIA NIM',
    ],
    highlights: [
      'Built a low-latency voice assistant with a wake word ("Hey Vox"), voice activity detection, push-to-talk, and the ability to interrupt it mid-reply.',
      'Made the speech pipeline pluggable: NVIDIA Parakeet/Canary, in-browser Whisper (ONNX) or the Web Speech API for speech-to-text, and FastPitch + HiFi-GAN, Kokoro or browser speech for text-to-speech, all played through a FIFO audio queue.',
      'Streamed LLM replies token by token over Socket.IO from NVIDIA Llama-3.1 Nemotron 70B, Ollama or any OpenAI-compatible endpoint, with request cancellation and rolling conversation memory.',
      'Designed an animated avatar UI (idle, listening, thinking, speaking, error states) with an audio level meter and waveform visualiser built on the Web Audio API.',
      'Built the Express backend for model listing, transcription, synthesis and rate limiting, with multilingual recognition including Tamil.',
    ],
    image: '/images/projects/voice-assistant.webp',
    featured: true,
  },
  {
    slug: 'hustlebot-admin-portal',
    title: 'HustleBot Admin Portal',
    summary:
      'Enterprise admin platform for user management, template moderation, pricing tiers, and GST invoicing with payment reconciliation.',
    stack: [
      'React 19',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'shadcn/ui',
      'Tailwind CSS',
    ],
    highlights: [
      'Built the admin side of HustleBot for managing users, moderating templates, setting pricing tiers, and handling GST invoicing and payment reconciliation.',
      "Wrote htmlToUnlayer, a parser that walks raw HTML and converts it into Unlayer's JSON format, keeping the original styling and producing Outlook-safe markup, so older email templates can be opened in the editor.",
      'Used TanStack Query for server data and Zustand for app state, with optimistic updates in the chat hooks and retry handling for dropped connections.',
    ],
    image: '/images/projects/hustlebot-dashboard.webp',
    liveUrl: 'https://hustlebot.apprikart.com/admin/signin',
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  if (slug === 'voice-activated-virtual-assistant') {
    return projects.find((project) => project.slug === 'vox-neural-voice-assistant');
  }
  return projects.find((project) => project.slug === slug);
}

export const allProjectStacks = Array.from(
  new Set(projects.flatMap((project) => project.stack)),
).sort();
