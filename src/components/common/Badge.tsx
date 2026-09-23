import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'emerald' | 'purple' | 'neutral' | 'pink' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  icon,
  pulse = false,
  className = '',
}) => {
  const variantStyles = {
    blue: 'bg-rose-50 text-rose-700 border-rose-200/90 hover:border-rose-300 shadow-sm shadow-rose-500/5',
    cyan: 'bg-rose-50/80 text-rose-800 border-rose-200 hover:border-rose-300 shadow-sm shadow-rose-500/5',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300 shadow-sm shadow-emerald-500/5',
    purple: 'bg-slate-900 text-rose-300 border-slate-700 hover:border-rose-500/40 shadow-sm shadow-slate-900/5',
    pink: 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-300 shadow-sm shadow-rose-500/5',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    outline: 'bg-white text-slate-700 border-slate-200 shadow-sm',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 tracking-wider font-semibold',
    md: 'text-xs px-3.5 py-1 tracking-wider font-semibold',
    lg: 'text-sm px-4 py-1.5 tracking-wider font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md uppercase transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {icon && <span className="opacity-90">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
