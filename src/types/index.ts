export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string | 'Present';
  highlights: string[];
  stack: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  /** Primary card image. */
  image: string;
  /**
   * Optional additional shots per project, used for the hover cross-fade.
   * Falls back to `[image]` when omitted, so existing data needs no change.
   */
  images?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
};

export type Skill = {
  category: string;
  items: string[];
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  year: string;
  cgpa?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
};
