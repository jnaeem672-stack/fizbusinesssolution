import { Award, Expand } from 'lucide-react';
import type { StudentResult } from '@/content/results';

export default function ResultCard({ result, eager = false }: { result: StudentResult; eager?: boolean }) {
  return (
    <figure className="break-inside-avoid mb-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-shadow">
      <a
        href={result.image}
        target="_blank"
        rel="noopener"
        className="group relative block bg-gray-50"
        aria-label={`Open full-size screenshot: ${result.work}, ${result.grade}`}
      >
        <img
          src={result.image}
          alt={`Student result screenshot: ${result.work}, grade ${result.grade}. Personal details removed.`}
          width={result.width}
          height={result.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="w-full h-auto"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Expand className="w-3.5 h-3.5" /> Full size
        </span>
      </a>
      <figcaption className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-extrabold text-navy leading-snug">{result.work}</p>
          <span className="shrink-0 rounded-xl bg-navy px-3 py-1.5 text-sm font-black text-white">{result.grade}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{result.detail}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-wider">
          {result.level && <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-gray-700">{result.level}</span>}
          <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-gray-700">UK university</span>
          {result.best >= 70 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-[#FBF6E6] px-2.5 py-1 text-primary">
              <Award className="w-3.5 h-3.5" /> 70+ mark
            </span>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
