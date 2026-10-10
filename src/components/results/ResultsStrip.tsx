import Link from 'next/link';
import { ArrowRight, Award, FileCheck2, ShieldCheck } from 'lucide-react';
import { RESULTS_HIGHEST, STUDENT_RESULTS } from '@/content/results';

/** Small homepage band that links to /results. Deliberately has no screenshots. */
export default function ResultsStrip() {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="max-w-site mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-navy to-navy-light p-7 md:p-10 flex flex-col lg:flex-row lg:items-center gap-7 lg:gap-10 shadow-xl">
          <div className="flex-1">
            <p className="text-[11px] font-black uppercase tracking-widest text-[#C9A227] mb-2">Real Student Results</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">See the grades our students received</h2>
            <p className="mt-2 text-white/75">Real screenshots shared by students, with every personal detail removed.</p>
          </div>
          <ul className="grid grid-cols-3 gap-3 sm:gap-4 text-center lg:w-[420px]">
            <li className="rounded-2xl bg-white/10 px-2 py-4">
              <Award className="w-5 h-5 text-[#C9A227] mx-auto mb-1.5" />
              <p className="text-xl md:text-2xl font-black text-white">{RESULTS_HIGHEST}</p>
              <p className="text-[11px] font-bold text-white/70">Highest mark</p>
            </li>
            <li className="rounded-2xl bg-white/10 px-2 py-4">
              <FileCheck2 className="w-5 h-5 text-[#C9A227] mx-auto mb-1.5" />
              <p className="text-xl md:text-2xl font-black text-white">{STUDENT_RESULTS.length}</p>
              <p className="text-[11px] font-bold text-white/70">Results shared</p>
            </li>
            <li className="rounded-2xl bg-white/10 px-2 py-4">
              <ShieldCheck className="w-5 h-5 text-[#C9A227] mx-auto mb-1.5" />
              <p className="text-xl md:text-2xl font-black text-white">100%</p>
              <p className="text-[11px] font-bold text-white/70">Anonymous</p>
            </li>
          </ul>
          <Link
            href="/results"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-black whitespace-nowrap hover:brightness-105 transition-all"
          >
            See Student Results <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
