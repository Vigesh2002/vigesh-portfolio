'use client';

import { CheckCircle, Copy, Inbox, Phone, MessageCircle, Send, Globe } from '@/constants/icons';
import { useState } from 'react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/navigation';
import { SocialIcon } from '@/components/layout/social-icon';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { RevealGroup, RevealItem } from '@/components/motion/reveal';
import { ContactForm } from '@/components/forms/contact-form';
import { SpotlightCard } from '@/components/motion/spotlight-card';

export function Contact() {
  const { copied: emailCopied, copy: copyEmail } = useCopyToClipboard();
  const [phoneCopied, setPhoneCopied] = useState(false);

  const copyPhone = (text: string) => {
    navigator.clipboard.writeText(text);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-[var(--spacing-section-y)]">
      <Container>
        <SectionHeading
          eyebrow="Connect"
          title="Let's Build Something Together"
          description="Interested in discussing a full-time engineering opportunity or speaking directly? Reach out below."
        />

        <RevealGroup>
          <div className="mt-[var(--spacing-section-gap)] grid gap-[var(--spacing-block)] lg:grid-cols-12">
            {/* Left Column: Direct Info Cards with Spotlight */}
            <RevealItem className="space-y-[var(--spacing-block)] lg:col-span-5">
              {/* Email Card */}
              <SpotlightCard className="p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="border-accent/20 bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-xl border">
                    <Inbox className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                      Email Address
                    </h3>
                    <p className="text-foreground text-sm font-semibold break-all sm:text-base">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="xs:flex-row mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => copyEmail(profile.email)}
                    className="border-border/80 bg-muted/60 text-foreground hover:border-accent/40 hover:bg-accent/10 hover:text-accent inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-center text-xs font-medium transition-all"
                  >
                    {emailCopied ? (
                      <>
                        <CheckCircle className="text-accent size-3.5" />
                        <span className="text-accent font-semibold">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${profile.email}`}
                    className="border-accent/30 bg-accent text-accent-foreground shadow-accent/25 hover:bg-accent-hover inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-center text-xs font-semibold shadow-sm transition-all"
                  >
                    <MessageCircle className="size-3.5" aria-hidden="true" />
                    <span>Write</span>
                  </a>
                </div>
              </SpotlightCard>

              {/* Phone Card */}
              <SpotlightCard className="p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="border-accent/20 bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-xl border">
                    <Phone className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                      Phone Number
                    </h3>
                    <p className="text-foreground text-sm font-semibold sm:text-base">
                      {profile.phone}
                    </p>
                  </div>
                </div>

                <div className="xs:flex-row mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => copyPhone(profile.phone)}
                    className="border-border/80 bg-muted/60 text-foreground hover:border-accent/40 hover:bg-accent/10 hover:text-accent inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all"
                  >
                    {phoneCopied ? (
                      <>
                        <CheckCircle className="text-accent size-3.5" />
                        <span className="text-accent font-semibold">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="border-accent/30 bg-accent text-accent-foreground shadow-accent/25 hover:bg-accent-hover inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>Call</span>
                    <Phone className="size-3" />
                  </a>
                </div>
              </SpotlightCard>

              {/* Location & Availability Card */}
              <SpotlightCard className="p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="border-accent/20 bg-accent/10 text-accent flex size-10 shrink-0 items-center justify-center rounded-xl border">
                    <Globe className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                      Location & Work Mode
                    </h3>
                    <p className="text-foreground text-sm font-semibold sm:text-base">
                      {profile.location}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                  Available for Full-time roles across{' '}
                  <strong className="text-foreground">
                    On-site, Hybrid & Remote
                  </strong>{' '}
                  setups.
                </p>
              </SpotlightCard>

              {/* Social Channels Card */}
              <SpotlightCard className="p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 sm:p-6">
                <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Social & Code Profiles
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={
                        link.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        link.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="border-border/80 bg-muted/50 text-foreground hover:border-accent/40 hover:bg-accent/10 hover:text-accent inline-flex min-h-10 items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-all duration-200 hover:scale-105"
                    >
                      <SocialIcon name={link.icon} />
                      <span className="capitalize">{link.label}</span>
                    </a>
                  ))}
                </div>
              </SpotlightCard>
            </RevealItem>

            {/* Right Column: Contact Form */}
            <RevealItem className="lg:col-span-7">
              <SpotlightCard className="relative overflow-hidden p-5 shadow-2xl sm:p-8">
                <div className="border-border/50 mb-6 flex items-center justify-between gap-3 border-b pb-4">
                  <div className="min-w-0">
                    <h3 className="text-foreground text-lg font-bold tracking-tight">
                      Send a Message
                    </h3>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      I usually respond within 24 business hours.
                    </p>
                  </div>
                  <div className="border-accent/20 bg-accent/10 text-accent flex size-8 shrink-0 animate-pulse items-center justify-center rounded-lg border">
                    <Send className="size-4" />
                  </div>
                </div>

                <ContactForm />
              </SpotlightCard>
            </RevealItem>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
