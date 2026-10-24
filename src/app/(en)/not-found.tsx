import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Calculator, BookOpen } from 'lucide-react';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { SERVICE_LINKS } from '@/content/landing';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | FIZBS' },
  robots: { index: false, follow: true },
};

/** Friendly 404: keeps the visitor on the site with services, price and WhatsApp. */
export default function NotFound() {
  return (
    <main className="bg-gray-50">
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
          <p className="text-7xl md:text-8xl font-black text-primary mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">This page could not be found</h1>
          <p className="text-gray-300 text-lg mb-8">
            The link may be old or mistyped. You can still get expert help with your assignment, dissertation or research.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a href="/#quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary font-bold rounded-xl shadow-xl">
              <Calculator className="w-5 h-5" /> See Instant Price
            </a>
            <WhatsAppLink
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-navy font-bold rounded-xl shadow-xl"
            >
              <WhatsAppIcon size={24} className="w-6 h-6" /> Chat on WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-7">
            <h2 className="text-xl font-extrabold text-navy mb-4">Popular services</h2>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary">
                    <ArrowRight className="w-4 h-4 text-primary" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 p-7">
            <h2 className="text-xl font-extrabold text-navy mb-4">Helpful links</h2>
            <ul className="space-y-2.5 text-sm font-bold text-gray-600">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/services" className="hover:text-primary">All services</Link></li>
              <li><Link href="/blog" className="inline-flex items-center gap-2 hover:text-primary"><BookOpen className="w-4 h-4 text-primary" /> Free student guides</Link></li>
              <li><Link href="/our-team" className="hover:text-primary">Our experts</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact us</Link></li>
              <li><Link href="/ar" className="hover:text-primary">العربية</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
