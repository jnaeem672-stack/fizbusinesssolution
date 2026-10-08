import { BookOpenCheck, Megaphone, Calculator, BarChart3 } from 'lucide-react';
import type { TeamIcon } from '@/content/team';

const ICONS: Record<TeamIcon, typeof BookOpenCheck> = {
  research: BookOpenCheck,
  media: Megaphone,
  calculator: Calculator,
  chart: BarChart3,
};

/** Decorative initials avatar with gradient, glowing ring and a small expertise badge. */
export default function TeamAvatar({
  initials,
  gradient,
  icon,
  size = 'md',
}: {
  initials: string;
  gradient: string;
  icon: TeamIcon;
  size?: 'sm' | 'md' | 'lg';
}) {
  const Icon = ICONS[icon];
  const dims = size === 'lg' ? 'w-32 h-32 text-4xl' : size === 'sm' ? 'w-16 h-16 text-lg' : 'w-24 h-24 text-2xl';
  const badge = size === 'lg' ? 'w-11 h-11' : size === 'sm' ? 'w-7 h-7' : 'w-9 h-9';
  const badgeIcon = size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="relative inline-block" aria-hidden="true">
      <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${gradient} opacity-25 blur-md`} />
      <div className="relative rounded-full p-1 bg-white shadow-xl">
        <div className={`relative ${dims} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
          <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-white/15" />
          <span className="relative font-black text-white tracking-tight">{initials}</span>
        </div>
      </div>
      <span className={`absolute bottom-0 right-0 ${badge} rounded-full bg-white shadow-lg flex items-center justify-center ring-2 ring-white`}>
        <Icon className={`${badgeIcon} text-primary`} />
      </span>
    </div>
  );
}
