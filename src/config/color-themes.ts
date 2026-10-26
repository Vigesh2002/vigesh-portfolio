export type ColorThemeId =
  'indigo' | 'emerald' | 'violet' | 'amber' | 'cyan' | 'forest';

export interface ColorThemeOption {
  id: ColorThemeId;
  name: string;
  brand: string;
  description: string;
  previewColor: string;
  lightHex: string;
  darkHex: string;
}

export const colorThemes: ColorThemeOption[] = [
  {
    id: 'indigo',
    name: 'Indigo',
    brand: 'Linear & Stripe',
    description: 'Deep electric indigo with high-contrast accents',
    previewColor: '#6366f1',
    lightHex: '#4f46e5',
    darkHex: '#818cf8',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    brand: 'Supabase & Mintlify',
    description: 'Vibrant cyber emerald and modern green hues',
    previewColor: '#10b981',
    lightHex: '#059669',
    darkHex: '#34d399',
  },
  {
    id: 'violet',
    name: 'Violet',
    brand: 'Raycast & Solana',
    description: 'Electric ultraviolet with deep neon undertones',
    previewColor: '#8b5cf6',
    lightHex: '#7c3aed',
    darkHex: '#a78bfa',
  },
  {
    id: 'amber',
    name: 'Amber',
    brand: 'Cloudflare & Claude',
    description: 'Warm sunset amber and energetic orange tones',
    previewColor: '#f97316',
    lightHex: '#ea580c',
    darkHex: '#fb923c',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    brand: 'Vercel & Tailwind',
    description: 'Crisp dynamic cyan and electric sky blue',
    previewColor: '#0ea5e9',
    lightHex: '#0284c7',
    darkHex: '#38bdf8',
  },
  {
    id: 'forest',
    name: 'Forest',
    brand: 'Editorial & Gallery',
    description: 'Deep forest green with a restrained, gallery-calm feel',
    previewColor: '#0b5d3f',
    lightHex: '#0b5d3f',
    darkHex: '#34d399',
  },
];

export const DEFAULT_COLOR_THEME: ColorThemeId = 'indigo';
