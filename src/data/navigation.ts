import type { NavLink, SocialLink } from '@/types';

export const navigation: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/vigeshd', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/vigeshd',
    icon: 'linkedin',
  },
  {
    label: 'Email Vigesh',
    href: 'mailto:dhananjeyanvigesh@gmail.com',
    icon: 'mail',
  },
];
