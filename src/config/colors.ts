/**
 * Centralized Color System (TypeScript Tokens)
 *
 * NOTE: The primary single source of truth for runtime styling is `src/styles/colors.css`.
 * This file provides typed color constants for use in TypeScript code (such as OpenGraph images,
 * canvas drawings, metadata, or server components where CSS variables cannot be evaluated directly).
 */

export const colors = {
  light: {
    background: '#ffffff',
    foreground: '#171717',
    card: '#ffffff',
    cardForeground: '#171717',
    popover: '#ffffff',
    popoverForeground: '#171717',
    accent: '#4f46e5',
    accentForeground: '#ffffff',
    accentHover: '#4338ca',
    primary: '#4f46e5',
    primaryForeground: '#ffffff',
    muted: '#f4f4f5',
    mutedForeground: '#52525b',
    secondary: '#f4f4f5',
    secondaryForeground: '#18181b',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#4f46e5',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    success: '#16a34a',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    info: '#0284c7',
    infoForeground: '#ffffff',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#ededed',
    card: '#101012',
    cardForeground: '#ededed',
    popover: '#101012',
    popoverForeground: '#ededed',
    accent: '#818cf8',
    accentForeground: '#0a0a0a',
    accentHover: '#a5b4fc',
    primary: '#818cf8',
    primaryForeground: '#0a0a0a',
    muted: '#18181b',
    mutedForeground: '#a1a1aa',
    secondary: '#27272a',
    secondaryForeground: '#fafafa',
    border: '#27272a',
    input: '#27272a',
    ring: '#818cf8',
    destructive: '#f87171',
    destructiveForeground: '#0a0a0a',
    success: '#22c55e',
    successForeground: '#0a0a0a',
    warning: '#fbbf24',
    warningForeground: '#0a0a0a',
    info: '#38bdf8',
    infoForeground: '#0a0a0a',
  },
} as const;

export type ColorTheme = typeof colors;
