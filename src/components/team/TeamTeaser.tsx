import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import TeamAvatar from '@/components/team/TeamAvatar';
import { TEAM } from '@/content/team';

/** Compact "Meet the team" strip linking to /our-team. */
export default function TeamTeaser({ className = 'bg-white' }: { className?: string }) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/10 text-primary">Our Team</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">Meet the People Behind FIZBS</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
          Led by co-founders with MBA and MPhil qualifications, with a Chartered Accountant, MPhil finance specialists and 24 Master's and PhD-qualified subject specialists.
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 mb-10">
          {TEAM.map((m) => (
            <div key={m.name} className="w-36">
              <TeamAvatar initials={m.initials} gradient={m.gradient} icon={m.icon} size="sm" />
              <p className="mt-3 font-extrabold text-navy text-sm">{m.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.qualification}</p>
            </div>
          ))}
        </div>
        <Link href="/our-team" className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy text-white font-bold rounded-xl hover:brightness-110 transition-all">
          Meet Our Team <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
