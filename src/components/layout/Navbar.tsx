import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Program', href: '#overview' },
    { label: 'Hardware', href: '#kits' },
    { label: 'Journey', href: '#journey' },
    { label: 'Schedule', href: '#schedule' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Active link spy
      const sections = ['hero', 'overview', 'kits', 'journey', 'skills', 'schedule', 'register'];
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-slate-900/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Unified EDSOLS Logo */}
          <BrandLogo
            href="#hero"
            onClick={(e) => handleNavClick(e as any, '#hero')}
            theme="light"
            size="md"
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs xl:text-sm px-3 py-1.5 rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-rose-600 font-bold'
                      : 'text-slate-600 hover:text-rose-600 font-medium'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Persistent CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                href="#register"
                onClick={(e) => {
                  if (onRegisterClick) {
                    e.preventDefault();
                    onRegisterClick();
                  } else {
                    handleNavClick(e as any, '#register');
                  }
                }}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                className="font-bold text-xs tracking-wider uppercase shadow-md shadow-rose-500/25"
              >
                Register Now
              </Button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 focus:outline-none transition-colors shadow-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/98 backdrop-blur-2xl border-b border-slate-200 shadow-2xl p-6 transition-all animate-slide-down">
          <div className="flex flex-col gap-2 mb-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? 'text-rose-600 font-bold'
                      : 'text-slate-700 hover:text-rose-600'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <div className="text-xs text-slate-500 font-mono text-center">
              EDSOLS Bootcamp · Grades 6–12 · Oct & Nov Open
            </div>
            <Button
              variant="primary"
              size="lg"
              href="#register"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e as any, '#register');
              }}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-center uppercase tracking-wider font-bold"
            >
              Register Now →
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
