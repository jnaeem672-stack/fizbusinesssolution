import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { postPath, readingMinutes, type BlogPost } from '@/content/blog';

const TEXT = {
  en: {
    badge: 'Free Student Guides',
    title: 'Student Guides: Assignments, Dissertations and Research',
    sub: 'Practical, step-by-step guides from the FIZBS academic team for UK and Saudi university students.',
    read: 'min read',
    cta: 'Read guide',
    other: 'Arabic guides',
    otherHref: '/ar/blog',
  },
  ar: {
    badge: 'أدلة مجانية للطلاب',
    title: 'أدلة الطلاب: الواجبات والرسائل العلمية والبحث',
    sub: 'أدلة عملية خطوة بخطوة من فريق FIZBS الأكاديمي لطلاب الجامعات في السعودية وبريطانيا.',
    read: 'دقائق قراءة',
    cta: 'اقرأ الدليل',
    other: 'English guides',
    otherHref: '/blog',
  },
} as const;

export default function BlogIndex({ posts, locale }: { posts: BlogPost[]; locale: 'en' | 'ar' }) {
  const t = TEXT[locale];
  const isAr = locale === 'ar';
  return (
    <div lang={locale} className="bg-gray-50" dir={isAr ? 'rtl' : undefined}>
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 py-14 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-[11px] font-black uppercase tracking-wider mb-5">
            <BookOpen className="w-3.5 h-3.5" /> {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">{t.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t.sub}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={postPath(p)}
                className="group flex flex-col rounded-3xl bg-white border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <span className="text-[11px] font-black uppercase tracking-widest text-primary">{p.category}</span>
                <h2 className="mt-3 text-xl font-extrabold text-navy leading-snug group-hover:text-primary transition-colors">{p.title}</h2>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed flex-1">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-sm font-bold">
                  <span className="inline-flex items-center gap-1.5 text-gray-400"><Clock className="w-4 h-4" /> {readingMinutes(p)} {t.read}</span>
                  <span className="inline-flex items-center gap-1.5 text-navy group-hover:text-primary">
                    {t.cta} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href={t.otherHref} className="inline-flex items-center gap-2 text-sm font-black text-navy hover:text-primary">
              {t.other} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
