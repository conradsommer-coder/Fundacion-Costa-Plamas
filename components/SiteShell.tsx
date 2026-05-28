'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import i18n, { type SupportedLanguage } from '../src/i18n';
import Navbar from './Navbar';
import Footer from './Footer';
import LanguageRouteSync from '../src/i18n/LanguageRouteSync';

interface SiteShellProps {
  children: ReactNode;
  initialLanguage: SupportedLanguage;
}

const SiteShell = ({ children, initialLanguage }: SiteShellProps) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  if ((i18n.resolvedLanguage || i18n.language) !== initialLanguage) {
    void i18n.changeLanguage(initialLanguage);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if ((window as any).FundraiseUp) {
      try {
        (window as any).FundraiseUp.on('mount', () => {});
        (window as any).FundraiseUp.set('h', window.location.href);
      } catch (error) {
        console.warn('FundraiseUp trigger failed', error);
      }
    }
  }, [pathname]);

  return (
    <>
      <LanguageRouteSync />
      <div className="min-h-screen flex flex-col">
        <Navbar scrolled={scrolled} />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default SiteShell;
