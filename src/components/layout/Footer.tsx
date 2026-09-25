import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { bootcampData } from '../../data/bootcamp';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="flex flex-col gap-4 max-w-md">
            <BrandLogo
              href="#hero"
              onClick={(e) => handleNavClick(e as any, '#hero')}
              theme="dark"
              size="md"
            />

            <p className="text-sm text-slate-400 leading-relaxed">
              Hands-on technology learning for the next generation of creators, builders, and innovators by EDSOLS. Progressive learning tracks for ages 6+ and 12+ with real engineering and applied Edge AI capabilities.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-rose-500/15 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full font-bold">
                <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                Registrations Open · Dussehra & Special BootCamp
              </span>
            </div>
          </div>

          {/* Col 2: Contact & Location */}
          <div className="flex flex-col gap-3 md:items-end">
            <div className="w-full md:max-w-sm flex flex-col gap-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
                Contact & Lab
              </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${bootcampData.contact.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-rose-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span className="truncate">{bootcampData.contact.email}</span>
              </a>

              <a
                href={`tel:${bootcampData.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-rose-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{bootcampData.contact.phone}</span>
              </a>

              <a
                href={bootcampData.contact.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-rose-400 transition-colors"
              >
                <Globe className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>www.edsols.in</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{bootcampData.contact.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3">
              <span className="text-xs font-mono text-slate-500 uppercase block mb-2">Connect</span>
              <div className="flex items-center gap-2.5">
                {[
                  { name: 'LinkedIn', href: bootcampData.socialLinks.linkedin, label: 'IN' },
                  { name: 'Instagram', href: bootcampData.socialLinks.instagram, label: 'IG' },
                  { name: 'YouTube', href: bootcampData.socialLinks.youtube, label: 'YT' },
                  { name: 'GitHub', href: bootcampData.socialLinks.github, label: 'GH' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-rose-500/50 hover:bg-rose-500/10 transition-all"
                    aria-label={social.name}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {currentYear} EDSOLS Innovations Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Weekend Innovation Program</span>
            <span>•</span>
            <span>Ages 6+ & 12+</span>
            <span>•</span>
            <span className="text-rose-400">Robotics · IoT · AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
