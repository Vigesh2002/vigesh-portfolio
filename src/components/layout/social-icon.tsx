import { SOCIAL_ICONS, Mail } from '@/constants/icons';

type SocialIconProps = {
  name: string;
  className?: string;
};

export function SocialIcon({ name, className }: SocialIconProps) {
  const Icon = SOCIAL_ICONS[name] ?? Mail;
  return <Icon className={`size-4 ${className ?? ''}`} />;
}

export const brandIconNames = Object.keys(SOCIAL_ICONS);
