'use client';

import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { SUPPORT_FORM_PATH, scrollToSupportForm } from '@/constants/supportNavigation';
import { MEGA_MENU_CATEGORIES } from '@/constants/servicesCatalog';
import { alternateLanguagePath } from '@/content/landing/languageMap';
import { SERVICE_PAGE_LINKS } from '@/constants/serviceLinks';
import { AR_CITY_LINKS, AR_SERVICE_LINKS, AR_TECH_LINKS, isArabicPath, type NavItem } from '@/constants/arLinks';

const MENU_LINKS = SERVICE_PAGE_LINKS;

/** Services menu columns, the same shape for both languages */
const EN_MEGA_COLUMNS: { title: string; links: NavItem[] }[] = MEGA_MENU_CATEGORIES.map((col) => ({
  title: col.title,
  links: col.links.map((item) => ({ label: item, href: MENU_LINKS[item] ?? '/services' })),
}));
const AR_MEGA_COLUMNS: { title: string; links: NavItem[] }[] = [
  { title: 'خدماتنا بالعربية', links: AR_SERVICE_LINKS },
  { title: 'برامج التصميم والهندسة والبرمجة', links: AR_TECH_LINKS },
  { title: 'ندعم الطلاب في مدن المملكة', links: AR_CITY_LINKS },
];

const EN_NAV: NavLink[] = [
  { title: 'Home', path: '/' },
  { title: 'Services', path: '/services', mega: true },
  { title: 'About', path: '/about' },
  { title: 'Experts', path: '/our-team' },
  { title: 'Blog', path: '/blog' },
  { title: 'Samples', path: '/samples' },
  { title: 'Results', path: '/results' },
  { title: 'Get Price', path: '/#quote' },
  { title: 'Contact', path: '/contact' },
];
/** Arabic pages link to Arabic pages only */
const AR_NAV: NavLink[] = [
  { title: 'الرئيسية', path: '/ar' },
  { title: 'خدماتنا', path: '/ar/assignment-help-saudi-arabia', mega: true },
  { title: 'أدلة الطلاب', path: '/ar/blog' },
  { title: 'اعرف السعر', path: '/ar#quote' },
];

const UI = {
  en: { cta: 'Get Free Quote', open: 'Open menu', close: 'Close menu', allServices: 'All Services', viewAll: 'View all services', allHref: '/services', price: 'Get Instant Price', priceHref: '/#quote', offer: '🎁 First order 10% OFF', offerNote: '· Assignments from £20 per 1,000 words · Dissertations max £350' },
  ar: { cta: 'احصل على عرض سعر', open: 'فتح القائمة', close: 'إغلاق القائمة', allServices: 'كل الخدمات', viewAll: 'عرض كل الخدمات', allHref: '/ar/assignment-help-saudi-arabia', price: 'اعرف السعر الآن', priceHref: '/ar#quote', offer: '🎁 خصم 10% على أول طلب', offerNote: '· السعر بالريال عند الطلب · دعم عبر واتساب 24/7' },
} as const;

interface NavLink {
  title: string;
  path: string;
  mega?: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isAr = isArabicPath(pathname);
  const ui = UI[isAr ? 'ar' : 'en'];
  const megaColumns = isAr ? AR_MEGA_COLUMNS : EN_MEGA_COLUMNS;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSupportRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (document.getElementById('support-form')) {
      scrollToSupportForm();
    } else {
      router.push(isAr ? `/ar${SUPPORT_FORM_PATH.slice(1)}` : SUPPORT_FORM_PATH);
    }
    setIsOpen(false);
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === '/#quote' || path === '/ar#quote') {
      const el = document.getElementById('quote');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `${window.location.pathname}#quote`);
      }
    }
    setIsOpen(false);
  };

  const navLinks = isAr ? AR_NAV : EN_NAV;

  const isActive = (path: string) => pathname === path;
  const lang = alternateLanguagePath(pathname || '/');
  const langLabel = lang.toArabic ? 'العربية' : 'English';

  return (
    <nav className={`w-full h-[70px] bg-white transition-all duration-300 ${scrolled ? 'shadow-xl' : 'border-b border-gray-100'}`}>
      <div dir={isAr ? 'rtl' : undefined} className="max-w-site mx-auto px-4 h-full flex items-center justify-between">
        <Logo href={isAr ? '/ar' : '/'} />

        <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 h-full">
          {navLinks.map((link) => (
            <div
              key={link.title}
              className={`relative ${link.mega ? 'h-full flex items-center' : 'flex items-center'} ${isAr ? '' : link.path === '/results' ? 'hidden' : link.path === '/' ? 'hidden 2xl:flex' : link.path === '/#quote' || link.path === '/blog' || link.path === '/samples' ? 'hidden xl:flex' : ''}`}
              onMouseEnter={() => link.mega && setShowMegaMenu(true)}
              onMouseLeave={() => link.mega && setShowMegaMenu(false)}
            >
              <Link
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`group relative inline-flex items-center px-1.5 xl:px-2 pb-1 text-[13px] xl:text-sm font-black uppercase tracking-wider 2xl:tracking-widest whitespace-nowrap transition-colors ${
                  isActive(link.path) ? 'text-primary' : 'text-navy hover:text-primary'
                }`}
              >
                {link.title}
                {link.mega && <ChevronDown className="w-4 h-4 inline ms-1" />}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] bg-primary rounded-full transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>

              {link.mega && (
                <AnimatePresence>
                  {showMegaMenu && (
                    <motion.div
                      key="megamenu"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`fixed top-[110px] left-1/2 -translate-x-1/2 w-[min(1080px,calc(100vw-32px))] bg-white shadow-2xl rounded-b-2xl border-t border-gray-50 p-8 grid gap-6 ${isAr ? 'grid-cols-3' : 'grid-cols-4'}`}
                    >
                      {megaColumns.map((col) => (
                        <div key={col.title}>
                          <h3 className="text-navy font-black text-[10px] uppercase tracking-[0.2em] mb-4 border-b pb-2 text-primary">{col.title}</h3>
                          <ul className="space-y-1">
                            {col.links.map((item) => (
                              <li key={item.href}>
                                <Link href={item.href} className="text-xs font-bold text-gray-500 hover:text-primary hover:translate-x-1 transition-all block">
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className={`${isAr ? 'col-span-3' : 'col-span-4'} -mx-8 -mb-8 mt-2 px-8 py-4 bg-gradient-to-r from-navy to-navy-light rounded-b-2xl flex items-center justify-between gap-4`}>
                        <p className="text-white text-sm font-bold">
                          {ui.offer} <span className="text-white/60 font-semibold">{ui.offerNote}</span>
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          <Link href={ui.allHref} className="px-4 py-2 rounded-lg border border-white/20 text-white text-xs font-black uppercase tracking-wider hover:bg-white/10">
                            {ui.allServices}
                          </Link>
                          <a href={ui.priceHref} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-black uppercase tracking-wider hover:brightness-110">
                            {ui.price}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
          <Link
            href={lang.href}
            hrefLang={lang.toArabic ? 'ar' : 'en'}
            className="px-4 py-2.5 rounded-xl border-2 border-navy/10 text-navy font-black text-sm hover:border-primary hover:text-primary transition-colors"
          >
            {langLabel}
          </Link>
          <button
            onClick={handleSupportRequest}
            className="px-5 2xl:px-8 py-3 bg-primary text-white font-black text-xs uppercase tracking-[0.15em] 2xl:tracking-[0.2em] whitespace-nowrap rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
          >
            {ui.cta} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <Link
            href={lang.href}
            hrefLang={lang.toArabic ? 'ar' : 'en'}
            className="px-3 py-2 rounded-lg border-2 border-navy/10 text-navy font-black text-xs"
          >
            {langLabel}
          </Link>
          <button className="p-2 bg-gray-50 rounded-lg text-navy" onClick={() => setIsOpen(true)} aria-label={ui.open}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[2000]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              dir={isAr ? 'rtl' : undefined}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[2001] shadow-2xl p-6 sm:p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo href={isAr ? '/ar' : '/'} />
                <button onClick={() => setIsOpen(false)} aria-label={ui.close} className="p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-grow">
                {navLinks.map((link) =>
                  link.mega ? (
                    <div key={link.title}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        aria-expanded={mobileServicesOpen}
                        className={`w-full flex items-center justify-between text-xl font-black uppercase tracking-tight pb-2 border-b-4 ${mobileServicesOpen || pathname === link.path ? 'text-primary border-primary' : 'text-navy border-transparent'}`}
                      >
                        {link.title}
                        <ChevronDown className={`w-6 h-6 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileServicesOpen && (
                        <div className="mt-3 space-y-4 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                          {megaColumns.map((col) => (
                            <div key={col.title}>
                              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{col.title}</p>
                              <ul className="space-y-2">
                                {col.links.map((item) => (
                                  <li key={item.href}>
                                    <Link href={item.href} onClick={() => setIsOpen(false)} className="block text-[15px] font-bold text-navy hover:text-primary">
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link href={ui.allHref} onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm font-black text-primary pt-1">
                            {ui.viewAll} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.title}
                      href={link.path}
                      className={`text-xl font-black uppercase tracking-tight transition-all pb-2 border-b-4 ${isActive(link.path) ? 'text-primary border-primary' : 'text-navy border-transparent'}`}
                      onClick={(e) => handleNavClick(e, link.path)}
                    >
                      {link.title}
                    </Link>
                  )
                )}
              </div>


              <div className="flex flex-col gap-4 mt-8 pb-4">
                <button
                  onClick={handleSupportRequest}
                  className="w-full py-4 text-center bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/30"
                >
                  {ui.cta}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
