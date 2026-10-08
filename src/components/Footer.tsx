import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Facebook, Mail } from 'lucide-react';
import Logo from './Logo';
import WhatsAppLink from '@/components/ui/WhatsAppLink';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { WHATSAPP_URL, WHATSAPP_NUMBER } from '@/constants/whatsapp';
import { CONTACT_EMAIL, MAILTO_URL } from '@/constants/contact';
import { SERVICE_LINKS, CITY_LINKS } from '@/content/landing';

const Footer = () => (
  <footer className="bg-navy py-10 md:py-12 px-4 md:px-8 flex flex-col items-center text-white/50 text-[11px] shrink-0 border-t border-white/5 space-y-6">
    <div className="flex flex-col items-center gap-4">
      <Logo dark />
      <p className="text-center max-w-2xl leading-relaxed text-white/60">
        Assignment, dissertation and research help for students in the UK and Saudi Arabia since 2015. Qualified subject experts, transparent pricing and 24/7 WhatsApp support.
      </p>
      <p className="text-center max-w-md leading-relaxed">
        © {new Date().getFullYear()} FIZ Business Solutions. All rights reserved.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 w-full max-w-3xl pt-2 text-[12px]">
      <div>
        <h2 className="text-white font-black text-[11px] uppercase tracking-widest mb-3">Popular Services</h2>
        <ul className="space-y-2">
          {SERVICE_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white/60 hover:text-white transition-colors">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-white font-black text-[11px] uppercase tracking-widest mb-3">Assignment Help by City</h2>
        <ul className="space-y-2">
          {CITY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-white/60 hover:text-white transition-colors">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 w-full max-w-lg">
      <WhatsAppLink href={WHATSAPP_URL} className="flex items-center gap-2 text-white/70 font-bold hover:text-[#25D366] transition-colors text-center">
        <WhatsAppIcon size={16} className="w-4 h-4" />
        WhatsApp: {WHATSAPP_NUMBER}
      </WhatsAppLink>
      <a href={MAILTO_URL} className="flex items-center gap-2 text-white/70 font-bold hover:text-primary transition-colors text-center break-all">
        <Mail className="w-4 h-4 text-primary shrink-0" />
        {CONTACT_EMAIL}
      </a>
    </div>

    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4 border-t border-white/5 w-full max-w-3xl text-[10px] uppercase tracking-widest font-bold">
      <Link href="/" className="hover:text-white transition-colors">Home</Link>
      <Link href="/services" className="hover:text-white transition-colors">Services</Link>
      <Link href="/about" className="hover:text-white transition-colors">About</Link>
      <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
      <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
    </div>

    <div className="flex gap-6 text-white/30">
      {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
        <span key={i} aria-hidden="true"><Icon className="w-4 h-4" /></span>
      ))}
    </div>
  </footer>
);

export default Footer;
