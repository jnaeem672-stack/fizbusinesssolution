import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EN_POSTS, postPath } from '@/content/blog';

/** Homepage strip linking to the newest student guides (internal links for SEO). */
export default function LatestGuides() {
  const posts = EN_POSTS.slice(0, 3);
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">Free Student Guides</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">Learn How to Write It Well</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black text-navy hover:text-primary">
            All guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={postPath(p)} className="group rounded-3xl border border-gray-100 bg-gray-50 p-7 hover:shadow-xl hover:-translate-y-1 transition-all">
              <span className="text-[11px] font-black uppercase tracking-widest text-primary">{p.category}</span>
              <h3 className="mt-3 text-lg font-extrabold text-navy leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
