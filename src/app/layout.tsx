import '@/app/globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ColorThemeProvider } from '@/components/providers/color-theme-provider';
import { AmbientBackground } from '@/components/layout/ambient-background';
import { MotionProvider } from '@/components/providers/motion-provider';
import { NoiseOverlay } from '@/components/layout/noise-overlay';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { site } from '@/config/site';
import { Toaster } from 'sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const bodyClasses = [inter.variable, jetBrainsMono.variable].join(' ');

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    type: 'website',
    images: [{ url: site.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage }],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
} satisfies Metadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={bodyClasses} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-color-theme')||'indigo';document.documentElement.setAttribute('data-color-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-background text-foreground selection:bg-accent/20 selection:text-accent relative min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ColorThemeProvider>
            <MotionProvider>
              <NoiseOverlay />
              <AmbientBackground />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster closeButton richColors />
            </MotionProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
