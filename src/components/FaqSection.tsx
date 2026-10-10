import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  rtl?: boolean;
  /** Output FAQPage structured data (only once per page) */
  withSchema?: boolean;
  className?: string;
}

export default function FaqSection({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle,
  badge = 'FAQ',
  rtl = false,
  withSchema = true,
  className = 'bg-white',
}: FaqSectionProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <section id="faq" className={`py-16 md:py-24 ${className}`} dir={rtl ? 'rtl' : undefined}>
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 bg-primary/10 text-primary">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">{title}</h2>
          {subtitle && <p className="text-gray-500 text-base md:text-lg leading-relaxed">{subtitle}</p>}
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[#E0BC4A] mt-6 mx-auto" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={faq.q}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm open:shadow-lg open:border-primary/20 transition-all"
              open={i === 0}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-navy font-bold text-base md:text-lg leading-snug">{faq.q}</h3>
                <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-gray-600 leading-relaxed text-[15px]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
