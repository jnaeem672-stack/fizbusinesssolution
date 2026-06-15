'use client';

import { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { ORDER_FORM_PATH, scrollToOrderForm } from '@/constants/orderNavigation';
import { MEGA_MENU_CATEGORIES } from '@/constants/servicesCatalog';

interface NavLink {
  title: string;
  path: string;
  mega?: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderNow = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (document.getElementById('order-form')) {
      scrollToOrderForm();
    } else {
      router.push(ORDER_FORM_PATH);
    }
    setIsOpen(false);
  };

  const navLinks: NavLink[] = [
    { title: 'Home', path: '/' },
    { title: 'Services', path: '/services', mega: true },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`w-full h-[70px] bg-white transition-all duration-300 ${scrolled ? 'shadow-xl' : 'border-b border-gray-100'}`}>
      <div className="max-w-site mx-auto px-4 h-full flex items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <div
              key={link.title}
              className={`relative ${link.mega ? 'h-full flex items-center' : 'flex items-center'}`}
              onMouseEnter={() => link.mega && setShowMegaMenu(true)}
              onMouseLeave={() => link.mega && setShowMegaMenu(false)}
            >
              <Link
                href={link.path}
                className={`group relative inline-flex items-center px-2 pb-1 text-sm font-black uppercase tracking-widest transition-colors ${
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
                                <Link href="/services" className="text-xs font-bold text-gray-500 hover:text-primary hover:translate-x-1 transition-all block">
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={handleOrderNow}
            className="px-8 py-3 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
          >
            Order Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button className="lg:hidden p-2 bg-gray-50 rounded-lg text-navy" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
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
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[2001] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <Logo />
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 flex-grow">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.path}
                    className={`text-2xl font-black uppercase tracking-tight transition-all pb-2 border-b-4 ${isActive(link.path) ? 'text-primary border-primary' : 'text-navy border-transparent'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <button
                  onClick={handleOrderNow}
                  className="w-full py-4 text-center bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/30"
                >
                  Order Now
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
