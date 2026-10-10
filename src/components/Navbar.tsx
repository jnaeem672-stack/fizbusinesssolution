'use client';

import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { SUPPORT_FORM_PATH, scrollToSupportForm } from '@/constants/supportNavigation';
import { MEGA_MENU_CATEGORIES } from '@/constants/servicesCatalog';
import { alternateLanguagePath } from '@/content/landing/languageMap';
import { SERVICE_PAGE_LINKS } from '@/constants/serviceLinks';

const MENU_LINKS = SERVICE_PAGE_LINKS;

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
      router.push(SUPPORT_FORM_PATH);
    }
    setIsOpen(false);
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === '/#quote') {
      const el = document.getElementById('quote');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `${window.location.pathname}#quote`);
      }
    }
    setIsOpen(false);
  };

  const navLinks: NavLink[] = [
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

  const isActive = (path: string) => pathname === path;
  const lang = alternateLanguagePath(pathname || '/');
  const langLabel = lang.toArabic ? 'العربية' : 'English';

  return (
    <nav className={`w-full h-[70px] bg-white transition-all duration-300 ${scrolled ? 'shadow-xl' : 'border-b border-gray-100'}`}>
      <div className="max-w-site mx-auto px-4 h-full flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 h-full">
          {navLinks.map((link) => (
            <div
              key={link.title}
              className={`relative ${link.mega ? 'h-full flex items-center' : 'flex items-center'} ${link.path === '/results' ? 'hidden' : link.path === '/' ? 'hidden 2xl:flex' : link.path === '/#quote' || link.path === '/blog' || link.path === '/samples' ? 'hidden xl:flex' : ''}`}
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
                {link.mega && <ChevronDown className="w-4 h-4 inline ml-1" />}
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
                      className="absolute top-[70px] left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-2xl rounded-b-2xl border-t border-gray-50 p-8 grid grid-cols-3 gap-8"
                    >
                      {MEGA_MENU_CATEGORIES.map((col) => (
                        <div key={col.title}>
                          <h3 className="text-navy font-black text-[10px] uppercase tracking-[0.2em] mb-4 border-b pb-2 text-primary">{col.title}</h3>
                          <ul className="space-y-1">
                            {col.links.map((item) => (
                              <li key={item}>
                                <Link href={MENU_LINKS[item] ?? '/services'} className="text-xs font-bold text-gray-500 hover:text-primary hover:translate-x-1 transition-all block">
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-3 -mx-8 -mb-8 mt-2 px-8 py-4 bg-gradient-to-r from-navy to-navy-light rounded-b-2xl flex items-center justify-between gap-4">
                        <p className="text-white text-sm font-bold">
                          🎁 First order 10% OFF <span className="text-white/60 font-semibold">· Assignments from £20 per 1,000 words · Dissertations max £350</span>
                        </p>
                        <div className="flex items-center gap-2 shrink-0">
                          <Link href="/services" className="px-4 py-2 rounded-lg border border-white/20 text-white text-xs font-black uppercase tracking-wider hover:bg-white/10">
                            All Services
                          </Link>
                          <a href="/#quote" className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-black uppercase tracking-wider hover:brightness-110">
                            Get Instant Price
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
            Get Free Quote <ArrowRight className="w-4 h-4" />
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
          <button className="p-2 bg-gray-50 rounded-lg text-navy" onClick={() => setIsOpen(true)} aria-label="Open menu">
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
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[2001] shadow-2xl p-6 sm:p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors">
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
                        className={`w-full flex items-center justify-between text-xl font-black uppercase tracking-tight pb-2 border-b-4 ${mobileServicesOpen || pathname === '/services' ? 'text-primary border-primary' : 'text-navy border-transparent'}`}
                      >
                        {link.title}
                        <ChevronDown className={`w-6 h-6 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileServicesOpen && (
                        <div className="mt-3 space-y-4 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                          {MEGA_MENU_CATEGORIES.map((col) => (
                            <div key={col.title}>
                              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{col.title}</p>
                              <ul className="space-y-2">
                                {col.links.map((item) => (
                                  <li key={item}>
                                    <Link href={MENU_LINKS[item] ?? '/services'} onClick={() => setIsOpen(false)} className="block text-[15px] font-bold text-navy hover:text-primary">
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link href="/services" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm font-black text-primary pt-1">
                            View all services <ArrowRight className="w-4 h-4" />
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
                  Get Free Quote
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
