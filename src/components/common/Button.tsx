import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  href,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'group relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-rose-500/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-rose-600 via-rose-600 to-rose-700 text-white font-semibold shadow-md shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 hover:scale-[1.02] active:scale-[0.98] border border-rose-400/30',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-rose-300 hover:text-rose-600 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    outline: 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-600 border border-slate-300 hover:border-rose-300 shadow-sm active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-rose-50 text-slate-700 hover:text-rose-600',
    glow: 'bg-gradient-to-r from-rose-600 via-rose-700 to-pink-700 text-white font-bold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/45 hover:scale-[1.03] active:scale-[0.98] border border-rose-400/40',
    accent: 'bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold shadow-md shadow-slate-900/25 hover:shadow-xl hover:shadow-slate-900/35 hover:scale-[1.02] active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-semibold',
    md: 'text-sm px-5 py-2.5 gap-2 font-semibold',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-bold tracking-wide',
    xl: 'text-lg px-8 py-4 gap-3 font-extrabold tracking-wide',
  };

  const content = (
    <>
      <span className="absolute inset-x-0 top-0 h-[1px] bg-white/40 pointer-events-none" />
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {content}
    </button>
  );
};
