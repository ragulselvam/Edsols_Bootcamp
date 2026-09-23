import React from 'react';

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'cyan' | 'purple' | 'emerald' | 'pink';
  techCorners?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  interactive = true,
  onClick,
}) => {
  const glowStyles = {
    blue: 'hover:border-rose-300 hover:shadow-[0_15px_30px_-5px_rgba(225,29,72,0.14)] group-hover:border-rose-300',
    cyan: 'hover:border-rose-300 hover:shadow-[0_15px_30px_-5px_rgba(225,29,72,0.14)] group-hover:border-rose-300',
    purple: 'hover:border-slate-400 hover:shadow-[0_15px_30px_-5px_rgba(15,23,42,0.14)] group-hover:border-slate-400',
    emerald: 'hover:border-emerald-300 hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.12)] group-hover:border-emerald-300',
    pink: 'hover:border-rose-300 hover:shadow-[0_15px_30px_-5px_rgba(225,29,72,0.14)] group-hover:border-rose-300',
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-edsols-card transition-all duration-300 ${
        interactive ? 'hover:-translate-y-1 ' + glowStyles[glowColor] : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Subtle top glare highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none rounded-t-2xl" />
      {children}
    </div>
  );
};
