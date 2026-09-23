import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface FloatingCTAProps {
  onRegisterClick: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onRegisterClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollPos > 500 && scrollPos < docHeight - 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Registration Bar"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl transition-all duration-500 animate-slide-up"
    >
      <div className="glass-panel bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-blue-200/90 shadow-2xl shadow-blue-900/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 pl-2">
          <span className="flex h-8 w-8 rounded-xl bg-blue-50 border border-blue-200 items-center justify-center text-blue-600">
            <Sparkles className="w-4 h-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              EDSOLS Bootcamp
              <span className="hidden md:inline-block text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                OCT & NOV OPEN
              </span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:block">
              Grades 6–12 · Weekend Morning & Afternoon Batches
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onRegisterClick}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          className="whitespace-nowrap font-bold text-xs uppercase tracking-wider px-4 py-2 shadow-md shadow-blue-500/25"
        >
          Register Now
        </Button>
      </div>
    </aside>
  );
};
