import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import type { LogoProps } from '@/types';

const Logo = ({ className = '', dark = false }: LogoProps) => (
  <Link href="/" className={`flex items-center gap-3 group transition-all ${className}`}>
    <div className="relative">
      <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:bg-primary transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <GraduationCap className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-white shadow-sm ring-1 ring-black/5" title="Support Online" />
    </div>
    <div className="flex flex-col">
      <div className="flex items-center tracking-tighter">
        <span className="text-primary font-black text-2xl uppercase">FIZ</span>
        <span className={`${dark ? 'text-white' : 'text-navy'} font-black text-2xl uppercase`}>BS</span>
      </div>
      <div className="flex items-center gap-1.5 -mt-1">
        <span className={`${dark ? 'text-white/40' : 'text-gray-400'} text-[7px] font-bold uppercase tracking-[0.22em]`}>Assignment &amp; Dissertation Help</span>
      </div>
    </div>
  </Link>
);

export default Logo;
